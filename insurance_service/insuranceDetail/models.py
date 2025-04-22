from django.db import models
from insuranceProvider.models import InsuranceProvider

# Create your models here.
class InsuranceDetail(models.Model):
    patient_id = models.IntegerField()
    provider = models.ForeignKey(InsuranceProvider, on_delete=models.CASCADE)
    policy_number = models.CharField(max_length=100)
    valid_until = models.DateField()

    def __str__(self):
        return f"Policy {self.policy_number} - Patient {self.patient_id}"