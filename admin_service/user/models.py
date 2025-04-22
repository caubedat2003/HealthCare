from django.db import models

# Create your models here.
class User(models.Model):
    ROLE_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('pharmacist', 'Pharmacist'),
        ('admin', 'Admin'),
        ('lab_technician', 'Lab Technician'),
    ]

    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)  # use hashed passwords (Django handles this if you use AbstractUser)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username