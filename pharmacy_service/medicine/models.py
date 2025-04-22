from django.db import models

# Create your models here.
class Medicine(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    stock_quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name