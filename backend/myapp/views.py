from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer

@api_view(['POST'])
def register(request):
    print("Data yang diterima:", request.data)  # Untuk debugging
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = serializer.save()
            print("User berhasil dibuat:", user.username)  # Untuk debugging
            
            # Buat token
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            print("Error saat membuat user:", str(e))  # Untuk debugging
            return Response({
                'error': 'Gagal membuat user',
                'detail': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    print("Error validasi:", serializer.errors)  # Untuk debugging
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    print("Received data:", request.data)  # Tambahkan ini
    user = request.data.get('username')
    password = request.data.get('password')
    
    print("Username:", user)  # Tambahkan ini
    print("Password:", password)  # Tambahkan ini
    
    user = authenticate(username=user, password=password)
    print(user)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)