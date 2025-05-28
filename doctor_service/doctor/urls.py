from django.urls import path
from .views import DoctorProfileView, DoctorListView

urlpatterns = [
    path('api/doctor/profile/', DoctorProfileView.as_view(), name='doctor-profile'),
    path('api/doctor/list/', DoctorListView.as_view(), name='doctor-list'),
]