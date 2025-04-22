from django.db import models
from doctor.models import Doctor

# Create your models here.
class Diagnosis(models.Model):
    id = models.AutoField(primary_key=True)
    patient_id = models.IntegerField()  # Assuming patient ID as integer for simplicity
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    symptoms = models.TextField()
    diagnosis = models.TextField()
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Diagnosis by {self.doctor.name} for patient {self.patient_id}"