from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExperimentSessionViewSet

app_name = 'experiments'

router = DefaultRouter()
router.register(r'experiments', ExperimentSessionViewSet, basename='experiment')

urlpatterns = [
    path('', include(router.urls)),
]