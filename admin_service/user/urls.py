from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserRegisterView, CustomTokenObtainPairView, UserProfileView, UserViewSet

router = DefaultRouter()
router.register(r'api/admin/users', UserViewSet, basename='user')

urlpatterns = [
    path('api/admin/users/register', UserRegisterView.as_view(), name='user-register'),
    path('api/admin/users/login', CustomTokenObtainPairView.as_view(), name='user-login'),
    path('api/admin/users/me', UserProfileView.as_view(), name='user_profile'),
] + router.urls