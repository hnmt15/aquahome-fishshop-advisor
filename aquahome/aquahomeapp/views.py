from django.shortcuts import render
from django.db import models
from aquahomeapp import serializers
from aquahomeapp.models import Product, Category, User, Order
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .perms import *

class UserViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ('list', 'destroy', 'create_staff'):
            return [IsAdminOnly()]
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminOrOwner()]
    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.UserRegisterSerializer
        if self.action == 'create_staff':
            return serializers.StaffCreateSerializer
        if self.action in ('update', 'partial_update'):
            return serializers.AdminUpdateSerializer
        return serializers.UserSerializer
    def get_queryset(self):
        user = self.request.user
        if user.role == User.RoleChoices.ADMIN:
            return User.objects.all()
        return User.objects.filter(id=user.id)

    @action(methods=["post"],detail=False,url_path="create-staff")
    def create_staff(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        staff_user = serializer.save()
        return Response(serializers.UserSerializer(staff_user).data, status=status.HTTP_201_CREATED)
    @action(methods=["get", "put", "patch"],detail=False,permission_classes=[IsAuthenticated])
    def me(self, request):
        user = request.user
        if request.method == "GET":
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        elif request.method in ["PUT", "PATCH"]:
            partial = request.method == "PATCH"
            serializer = self.get_serializer(user, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [AllowAny]
    serializer_class = serializers.CategorySerializer
    def get_permissions(self):
        if self.action in ('create', 'update', 'destroy', 'partial_update'):
            return[IsStaffOrAdmin()]
        return super().get_permissions()

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    def get_permissions(self):
        if self.action in ('create', 'update', 'destroy', 'partial_update'):
            return[IsStaffOrAdmin()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ProductListSerializer
        if self.action == 'retrieve':
            return serializers.ProductDetailSerializer
        return serializers.ProductSerializer

    def perform_create(self, serializer):
        serializer.save(is_active=True)

class OrderViewSet(viewsets.ModelViewSet):
    def is_admin_or_staff(self, user):
        return getattr(user, 'role', '') in ('ADMIN', 'STAFF') or user.is_staff or user.is_superuser
    def get_permissions(self):
        if self.action == 'create':
            return [IsCustomerOnly()]
        return [IsAdminOrStaffOrOwner()]

    def get_queryset(self):
        user = self.request.user
        if self.is_admin_or_staff(user):
            return Order.objects.all()
        return Order.objects.filter(customer=user)

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            if self.request.user.is_staff or self.request.user.is_superuser:
                return serializers.OrderStatusUpdateSerializer
            return serializers.OrderUpdateSerializer
        if self.action == 'create':
            return serializers.OrderCreateSerializer
        if self.action == 'list':
            return serializers.OrderListSerializer
        if self.action == 'retrieve':
            return serializers.OrderDetailSerializer
        return serializers.OrderListSerializer

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    def perform_update(self, serializer):
        order = self.get_object()
        user = self.request.user
        if user == order.customer:
            if order.status != Order.StatusChoices.PENDING:
                raise PermissionDenied("Đơn hàng đang được chuẩn bị, không thể chỉnh sửa")
            serializer.save()
        elif (user.is_superuser or user.is_staff):
            serializer.save()
        else:
            raise PermissionDenied("Bạn không có quyền chỉnh sửa đơn hàng này.")



