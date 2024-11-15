from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ExperimentSession, SimulationState, ExperimentResult
from .models import Configuration

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class SimulationStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimulationState
        fields = ['id', 'timestamp', 'active_tab', 'elastic_state', 'inelastic_state']

class ExperimentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperimentResult
        fields = ['id', 'experiment_type', 'timestamp', 'initial_params', 'final_measurements']

class ExperimentSessionSerializer(serializers.ModelSerializer):
    states = SimulationStateSerializer(many=True, read_only=True)
    results = ExperimentResultSerializer(many=True, read_only=True)

    class Meta:
        model = ExperimentSession
        fields = ['id', 'created_at', 'updated_at', 'completed', 'states', 'results']

class ConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuration
        fields = ['configuration', 'simulation_type']