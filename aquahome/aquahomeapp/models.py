from wsgiref import validate
from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
from django.core.validators import MinValueValidator

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

class Species(BaseModel):
    name_vn= models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    min_temp = models.FloatField()
    max_temp = models.FloatField()
    min_ph = models.FloatField()
    max_ph = models.FloatField()
    max_length = models.FloatField()
    min_tank_size = models.FloatField()

    def __str__(self):
        return f"{self.scientific_name} - [{self.name_vn}]"

class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.name


class Feature(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class SpeciesFeature(BaseModel):
    species = models.ForeignKey(Species, on_delete=models.CASCADE, related_name="features")
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE, related_name="species")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["species", "feature"],
                name="unique_species_feature"
            )
        ]

    def __str__(self):
        return f"{self.species.name_vn} - {self.feature.name}"



class Product(BaseModel):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    image = CloudinaryField(null=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    species = models.ForeignKey(Species, null=True, blank=True, on_delete=models.SET_NULL, related_name="products")

    def __str__(self):
        return self.name

class ProductRecommendation(BaseModel):
    species = models.ForeignKey(Species, on_delete=models.CASCADE, related_name="recommendations")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="species_recommendations")
    reason = models.CharField(max_length=1000, blank=True)
    priority = models.IntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["species", "product"],
                name="unique_species_product_recommendation"
            )
        ]

    def __str__(self):
        return f"{self.species.name_vn} - {self.product.name}"


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