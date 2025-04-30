from django.urls import path
from .views import UserRegisterView, LoginView

urlpatterns = [
    path('api/admin/users/register', UserRegisterView.as_view(), name='user-register'),
    path('api/admin/users/login', LoginView.as_view(), name='user-login'),
]