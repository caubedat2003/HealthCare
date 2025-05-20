from django.db import models
from user.models import User
from role.models import Role

# Create your models here.
class StaffSchedule(models.Model):
    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, related_name='role_staff')
    shift_time = models.CharField(max_length=100)  # could be improved with datetime or a time slot model

    def __str__(self):
        return f"{self.staff.username} - {self.shift_time}"