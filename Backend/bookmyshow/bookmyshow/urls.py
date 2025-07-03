"""
URL configuration for bookmyshow project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from service import views
from rest_framework.routers import DefaultRouter
from service.views import MovieListCreateView,MovieDetailView
# DRF Router
router = DefaultRouter()
router.register(r'bookings', views.BookingViewSet, basename='booking')

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔐 Authentication Endpoints
    path('api/signup/', views.signup, name='signup'),
    path('api/signin/', views.signin_password, name='signin_password'),
    path('api/send-otp/', views.send_otp, name='send_otp'),
    path('api/verify-otp/', views.verify_otp, name='verify_otp'),

    # ✅ Include all ViewSet-based routes (bookings)
    path('api/', include(router.urls)),
        path('api/movies/', MovieListCreateView.as_view(), name='movie-list-create'),
    path('api/movies/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
]

