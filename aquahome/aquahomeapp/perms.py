from rest_framework import permissions

class IsAdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        user=request.user
        return bool(user and user.is_authenticated and getattr(user, 'role', '') == 'ADMIN')

class IsStaffOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        user=request.user
        if not user or not user.is_authenticated:
            return False
        return bool(getattr(user, 'role', '')=='STAFF' or getattr(user, 'role', '')=='ADMIN')

class IsOwnerOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user=request.user
        return bool(getattr(user, 'role', '') == 'CUSTOMER')

class IsAdminOrOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)
    def has_object_permission(self, request, view, obj):
        user = request.user
        if getattr(user, 'role', '') == 'ADMIN':
            return True
        return obj == user


