from django.urls import path
from . import views

app_name = 'auth'

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('validate-token/', views.validate_token, name='validate-token'),
    path('save-configuration/', views.save_configuration, name='save_configuration'),
    path('get-configuration/<str:simulation_type>/', views.get_configuration, name='get_configuration'),
]