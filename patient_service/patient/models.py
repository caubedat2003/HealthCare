from django.db import models

class Address(models.Model):
    house_number = models.CharField(max_length=20)
    street = models.CharField(max_length=100)
    district = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.house_number}, {self.street}, {self.district}, {self.city}"

class Patient(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    TYPE_CHOICES = (
        ('Outpatient', 'Outpatient'),
        ('Inpatient', 'Inpatient'),
        ('Emergency', 'Emergency')
    )

    user_id = models.IntegerField(unique=True, null=True)  # Store the User's ID
    full_name = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    insurance_id = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES, default='Outpatient')

    def __str__(self):
        return self.full_name