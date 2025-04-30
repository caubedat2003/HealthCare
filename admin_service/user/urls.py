from django.urls import path
from .views import UserRegisterView

urlpatterns = [
    path('api/admin/users/register', UserRegisterView.as_view(), name='user-register'),
]