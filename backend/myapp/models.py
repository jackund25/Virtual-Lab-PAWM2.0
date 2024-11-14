from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Tambahkan related_name yang unik
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='myapp_user_groups'  # Tambahkan ini
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='myapp_user_permissions'  # Tambahkan ini
    )
    
    # Field custom Anda lainnya
    email = models.EmailField(unique=True)
