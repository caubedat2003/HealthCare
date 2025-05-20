from rest_framework import serializers
from .models import Role

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'description']

    def validate_name(self, value):
        if self.instance is None and Role.objects.filter(name=value).exists():
            raise serializers.ValidationError("A role with this name already exists.")
        return value