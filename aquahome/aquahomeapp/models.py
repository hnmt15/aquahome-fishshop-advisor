from wsgiref import validate

from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
# Create your models here
# User (Người dùng) (id, username, password, full_name, email, phone, avatar, role, is_active, created_at)
# Category (Danh mục) (id, name, description).
# Product (Sản phẩm) (id, category_id, species_id, name, description, price, stock_quantity, image, created_at)


class User(AbstractUser):
    class RoleChoices(models.TextChoices):
        ADMIN = "ADMIN"
        STAFF = "STAFF"
        CUSTOMER = "CUSTOMER"
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11)
    avatar = CloudinaryField(null = True, blank=True)
    role = models.CharField(max_length=20, choices=RoleChoices.choices, default=RoleChoices.CUSTOMER)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} [{self.role}]"

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

class Category(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.name

class Product(BaseModel):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    image = CloudinaryField(null=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


    def __str__(self):
        return self.name

#Order (Đơn hàng) (id, user_id, customer_name, customer_phone, customer_address, status, total_amount, created_at).
#Order_Item (Chi tiết đơn hàng) (id, order_id, product_id, quantity, unit_price).
class Order(BaseModel):
    class StatusChoices(models.TextChoices):
        PENDING = "PENDING"
        PROCESSING = "PROCESSING"
        DELIVERED = "DELIVERED"
        CANCELLED = "CANCELLED"
        REFUNDED = "REFUNDED"

    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=11, blank=False, null=False)
    customer_address = models.CharField(max_length=500, blank= False, null=False)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.PENDING)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if not self.price and self.product:
            self.price = self.product.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"