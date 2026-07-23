from .models import User, Category, Product
from rest_framework import serializers

class AvatarFullNameMixin:
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.avatar:
            data['avatar'] = instance.avatar.url
        data['full_name'] = f"{instance.first_name} {instance.last_name}".strip()
        return data
class UserSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    class Meta:
        model = User
        fields = ['username', 'email', 'phone', 'avatar', 'role', 'is_active']
        read_only_fields = ['role', 'is_active']
class AdminUpdateSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    class Meta:
        model = User
        fields = ['username', 'email', 'phone', 'avatar', 'role', 'is_active']
class UserRegisterSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["username", "email","password", "first_name", "last_name","phone", 'avatar']
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
class StaffCreateSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["username", "email","password", "first_name", "last_name","phone"]
    def create(self, validated_data):
        user = User.objects.create_user(role= User.RoleChoices.STAFF, is_staff=True, **validated_data)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    read_only_fields = ['created_at', 'updated_at', 'is_active']
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image:
            data['image'] = instance.image.url
        return data
class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'image', 'quantity']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image:
            data['image'] = instance.image.url
        return data
class ProductDetailSerializer(ProductListSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Product
        fields = ProductListSerializer.Meta.fields + ['category','description']


