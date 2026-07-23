from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from aquahomeapp import views

r = DefaultRouter()
r.register(r'category', views.CategoryViewSet)
r.register(r'product', views.ProductViewSet)
r.register(r'users', views.UserViewSet, basename='users')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(r.urls))
]