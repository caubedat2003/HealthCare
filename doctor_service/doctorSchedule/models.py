from django.db import models
from doctor.models import Doctor

# Create your models here.
class DoctorSchedule(models.Model):
    id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    available_time_slot = models.DateTimeField()

    def __str__(self):
        return f"{self.doctor.name} - {self.available_time_slot}"