from django.db import models
from pharmacist.models import Pharmacist
from medicine.models import Medicine

# Create your models here.
class DispenseRecord(models.Model):
    prescription_id = models.IntegerField()  # consider using a ForeignKey if prescription model is in the same service
    pharmacist = models.ForeignKey(Pharmacist, on_delete=models.CASCADE)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prescription {self.prescription_id} - {self.medicine.name}"