from django.db import models
from appointment.models import Appointment

# Create your models here.
class Prescription(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='prescriptions')
    medicine_name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    instructions = models.TextField()