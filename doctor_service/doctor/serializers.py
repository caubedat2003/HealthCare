from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(required=False)

    class Meta:
        model = Doctor
        fields = ['user_id', 'name', 'specialization', 'phone', 'email', 'schedule', 'created_at']
        read_only_fields = ['created_at']