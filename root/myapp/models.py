from django.contrib.auth.models import AbstractUser, User
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

class ExperimentSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Session {self.id} - {self.user.username}"

class SimulationState(models.Model):
    session = models.ForeignKey(ExperimentSession, on_delete=models.CASCADE, related_name='states')
    timestamp = models.DateTimeField(auto_now_add=True)
    active_tab = models.CharField(max_length=20)
    elastic_state = models.JSONField()
    inelastic_state = models.JSONField()
    
    class Meta:
        ordering = ['-timestamp']

class ExperimentResult(models.Model):
    session = models.ForeignKey(ExperimentSession, on_delete=models.CASCADE, related_name='results')
    experiment_type = models.CharField(max_length=20)  # 'elastic' atau 'inelastic'
    timestamp = models.DateTimeField(auto_now_add=True)
    initial_params = models.JSONField()
    final_measurements = models.JSONField()

class Configuration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    simulation_type = models.CharField(max_length=20)  # 'elastic' atau 'inelastic'
    configuration = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'simulation_type']