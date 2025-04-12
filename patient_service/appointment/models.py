from django.db import models
from patient.models import Patient

# Create your models here.
class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor_id = models.IntegerField()  # Communicate with doctor_service
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled')
    ])
    created_at = models.DateTimeField(auto_now_add=True)