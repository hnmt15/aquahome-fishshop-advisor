from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from aquahomeapp import views
from aquahomeapp.admin import admin_site

r = DefaultRouter()

urlpatterns = [
    path('admin/', admin_site.urls),
    path('', include(r.urls))
]