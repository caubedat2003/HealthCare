from django.urls import path
from .views import UserRegisterView, CustomTokenObtainPairView, UserProfileView

urlpatterns = [
    path('api/admin/users/register', UserRegisterView.as_view(), name='user-register'),
    path('api/admin/users/login', CustomTokenObtainPairView.as_view(), name='user-login'),
    path('api/admin/users/me', UserProfileView.as_view(), name='user_profile'),
]