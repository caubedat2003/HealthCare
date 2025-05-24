from rest_framework import serializers
from .models import Address, Patient

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['house_number', 'street', 'district', 'city']

class PatientSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    user_id = serializers.IntegerField(required=False)  # Changed to IntegerField

    class Meta:
        model = Patient
        fields = ['user_id', 'full_name', 'dob', 'gender', 'phone', 'email', 'address', 'insurance_id', 'type']
        read_only_fields = ['created_at']  # Removed user_id from read_only_fields

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)
        patient = Patient.objects.create(address=address, **validated_data)
        return patient

    def validate_email(self, value):
        if Patient.objects.filter(email=value).exists():
            raise serializers.ValidationError("A patient with this email already exists.")
        return value
    
    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if address_data:
            for key, value in address_data.items():
                setattr(instance.address, key, value)
            instance.address.save()
        instance.save()
        return instance