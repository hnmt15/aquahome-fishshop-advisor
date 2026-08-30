from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from aquahomeapp import views

r = DefaultRouter()
r.register(r'category', views.CategoryViewSet)
r.register(r'product', views.ProductViewSet)
r.register(r'users', views.UserViewSet, basename='users')
r.register(r'orders', views.OrderViewSet, basename='orders')
r.register(r'species', views.SpeciesViewSet, basename='species')
urlpatterns = [
    path('', include(r.urls))
]