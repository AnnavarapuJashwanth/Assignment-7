from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets, generics, permissions
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView
from .models import User, OTPStorage, Booking, Movie
from .serializers import UserSerializer, BookingSerializer, MovieSerializer
import random

# --- JWT Helper ---
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# --- Authentication Views ---

@api_view(['POST'])
def signup(request):
    data = request.data.copy()
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Signup successful'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signin_password(request):
    mobile = request.data.get('mobile')
    password = request.data.get('password')
    try:
        user = User.objects.get(mobile=mobile)
        if password == user.password:
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data,
                'tokens': tokens
            })
        else:
            return Response({'error': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def send_otp(request):
    mobile = request.data.get('mobile')
    try:
        user = User.objects.get(mobile=mobile)
        otp = str(random.randint(100000, 999999))
        OTPStorage.objects.update_or_create(
            mobile=mobile,
            defaults={'otp': otp, 'created_at': timezone.now()}
        )
        send_mail(
            'Your Login OTP',
            f'Your OTP is: {otp}',
            'noreply@bookmyshow.com',
            [user.email],
            fail_silently=False
        )
        return Response({'message': 'OTP sent to your email'})
    except User.DoesNotExist:
        return Response({'error': 'Mobile number not registered'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def resend_otp(request):
    return send_otp(request)

@api_view(['POST'])
def verify_otp(request):
    mobile = request.data.get('mobile')
    otp = request.data.get('otp')
    try:
        otp_entry = OTPStorage.objects.get(mobile=mobile)
        if timezone.now() - otp_entry.created_at > timedelta(minutes=10):
            return Response({'error': 'OTP expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)

        if otp_entry.otp == otp:
            user = User.objects.get(mobile=mobile)
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'OTP verified. Login successful.',
                'user': UserSerializer(user).data,
                'tokens': tokens
            })
        else:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
    except OTPStorage.DoesNotExist:
        return Response({'error': 'OTP not found. Please request again.'}, status=status.HTTP_404_NOT_FOUND)

# --- Booking Views ---

@api_view(['POST'])
def create_booking(request):
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'booking': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_bookings(request, user_id):
    bookings = Booking.objects.filter(user_id=user_id).order_by('-timestamp')
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        if user_id:
            return Booking.objects.filter(user_id=user_id).order_by('-timestamp')
        return Booking.objects.all().order_by('-timestamp')

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        if not user:
            user_id = self.request.data.get('user')
            if not user_id:
                raise ValueError("User ID must be provided.")
            user = get_object_or_404(User, id=user_id)

        timestamp = self.request.data.get('timestamp')
        if not timestamp:
            timestamp = int(timezone.now().timestamp() * 1000)
        serializer.save(user=user, timestamp=timestamp)

# --- Movie Views ---

# views.py
class MovieListCreateView(generics.ListCreateAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Movie.objects.filter(created_by_id=user_id)
        return Movie.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

# ✅ Add this new view
class MovieDetailView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]