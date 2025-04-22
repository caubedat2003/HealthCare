from django.db import models

# Create your models here.
class LabTest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]

    patient_id = models.IntegerField()
    doctor_id = models.IntegerField()
    test_type = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Test {self.id} - {self.test_type}"