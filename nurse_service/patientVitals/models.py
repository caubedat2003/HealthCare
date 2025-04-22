from django.db import models
from nurse.models import Nurse

# Create your models here.
class PatientVitals(models.Model):
    patient_id = models.IntegerField()
    nurse = models.ForeignKey(Nurse, on_delete=models.CASCADE)
    temperature = models.FloatField()
    blood_pressure = models.CharField(max_length=20)
    pulse = models.PositiveIntegerField()
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Vitals for Patient {self.patient_id}"