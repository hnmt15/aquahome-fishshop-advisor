from django.contrib import admin

# Register your models here.
class AquahomeAdminSite(admin.AdminSite):
    site_header = 'Hệ thống quản lý cửa hàng cá cảnh Aqua Home'


admin_site = AquahomeAdminSite(name='restaurant_admin')