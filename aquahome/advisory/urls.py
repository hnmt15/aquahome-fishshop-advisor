from django.urls import path
from .views import AdvisoryRecommendView

urlpatterns = [
    path("recommend", AdvisoryRecommendView.as_view(), name="advisory-recommend"),
]