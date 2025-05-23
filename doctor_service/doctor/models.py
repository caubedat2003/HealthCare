from django.db import models

# Create your models here.
class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    schedule = models.TextField()  # Could store a JSON or plain text representation
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name