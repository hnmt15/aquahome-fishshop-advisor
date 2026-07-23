from django.contrib import admin
from django.utils.safestring import mark_safe

# Register your models here.

from .models import User, Category, Product
admin.site.site_header = "Hệ Thống Quản Lý Cửa Hàng Cá Cảnh Aqua Home"
admin.site.site_title = "Aqua Home Admin"
admin.site.index_title = "Quản lý cửa hàng"
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "category", "price", "quantity", "description", "is_active", "created_at"]
    search_fields = ["name"]
    list_filter = ["category", "is_active"]
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        if obj.image_url:
            return mark_safe(f'<img src="{obj.image_url}" width="150" />')
        return "No photo"

admin.site.register(Category)
admin.site.register(User)
admin.site.register(Product)