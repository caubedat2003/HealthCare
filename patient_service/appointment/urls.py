from django.urls import path
from .views import AppointmentListView, AppointmentCreateView

urlpatterns = [
    path('api/patient/appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('api/patient/appointments/create/', AppointmentCreateView.as_view(), name='appointment-create'),
]