from django.db import models

# Create your models here.

class Address(models.Model):
    house_number = models.CharField(max_length=20)
    street = models.CharField(max_length=100)
    district = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    
class Patient(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )

    full_name = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    insurance_id = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=100)

