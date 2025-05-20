from django.db import models
from django.contrib.auth.models import AbstractUser
from role.models import Role

class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, related_name='users')

    def __str__(self):
        return self.username