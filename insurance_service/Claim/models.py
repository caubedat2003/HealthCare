from django.db import models
from insuranceDetail.models import InsuranceDetail

# Create your models here.
class Claim(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    patient_id = models.IntegerField()
    insurance = models.ForeignKey(InsuranceDetail, on_delete=models.CASCADE)
    claim_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Claim {self.id} - Patient {self.patient_id}"