from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .models import ExperimentSession, SimulationState, ExperimentResult
from .serializers import ExperimentSessionSerializer, SimulationStateSerializer, ExperimentResultSerializer
from .models import Configuration
from .serializers import ConfigurationSerializer

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })
    return Response({
        'error': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out'})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def validate_token(request):
    try:
        return Response({
            'user': UserSerializer(request.user).data
        })
    except Exception as e:
        return Response({
            'error': 'Invalid token'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_configuration(request):
        try:
            config, created = Configuration.objects.update_or_create(
                user=request.user,
                simulation_type=request.data['simulation_type'],
                defaults={'configuration': request.data['configuration']}
            )
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_configuration(request, simulation_type):
        try:
            config = Configuration.objects.get(
                user=request.user, 
                simulation_type=simulation_type
            )
            return Response({
                'configuration': config.configuration
            }, status=status.HTTP_200_OK)
        except Configuration.DoesNotExist:
            return Response({
                'configuration': None
            }, status=status.HTTP_404_NOT_FOUND)    
    
class ExperimentSessionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ExperimentSessionSerializer

    def get_queryset(self):
        return ExperimentSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def save_state(self, request, pk=None):
        session = self.get_object()
        state_data = request.data.get('state', {})
        
        state = SimulationState.objects.create(
            session=session,
            active_tab=state_data.get('activeTab'),
            elastic_state=state_data.get('elasticState', {}),
            inelastic_state=state_data.get('inelasticState', {})
        )
        
        return Response(SimulationStateSerializer(state).data)

    @action(detail=True, methods=['post'])
    def submit_result(self, request, pk=None):
        session = self.get_object()
        result = ExperimentResult.objects.create(
            session=session,
            experiment_type=request.data.get('experiment_type'),
            initial_params=request.data.get('initial_params', {}),
            final_measurements=request.data.get('final_measurements', {})
        )
        
        return Response(ExperimentResultSerializer(result).data)

