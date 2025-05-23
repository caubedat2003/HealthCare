from django.urls import path
from .views import PatientProfileView

urlpatterns = [
    path('api/patient/profile/', PatientProfileView.as_view(), name='patient-profile-create'),
]