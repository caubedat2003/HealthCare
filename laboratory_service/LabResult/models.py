from django.db import models
from LabTest.models import LabTest

# Create your models here.
class LabResult(models.Model):
    lab_test = models.ForeignKey(LabTest, on_delete=models.CASCADE)
    result_data = models.TextField()
    file_path = models.CharField(max_length=255, blank=True)  # path to uploaded report
    created_at = models.DateTimeField(auto_now_add=True)