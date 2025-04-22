from django.db import models
from doctor.models import Doctor

# Create your models here.
class MedicalReport(models.Model):
    id = models.AutoField(primary_key=True)
    patient_id = models.IntegerField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    report_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.doctor.name} for patient {self.patient_id}"