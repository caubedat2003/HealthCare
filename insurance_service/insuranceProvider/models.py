from django.db import models

# Create your models here.
class InsuranceProvider(models.Model):
    name = models.CharField(max_length=100)
    contact_info = models.TextField()

    def __str__(self):
        return self.name