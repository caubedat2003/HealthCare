from rest_framework import serializers
from .models import Appointment
from patient.models import Patient

class AppointmentSerializer(serializers.ModelSerializer):
    patient_id = serializers.IntegerField(source='patient.user_id', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient_id', 'doctor_id', 'appointment_date', 'status', 'created_at']
        read_only_fields = ['id', 'patient_id', 'created_at']