# serializers.py
"""Fleet serializers for Driver and Vehicle models."""
from rest_framework import serializers
from .models import Driver, Vehicle

class DriverSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = Driver
        fields = ("id", "user", "name", "email", "license_number", "phone_number", "is_active", "profile_image")
        read_only_fields = ("id",)

    def get_name(self, obj):
        return obj.user.get_full_name()

    def get_email(self, obj):
        return obj.user.email

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = (
            "id",
            "vin",
            "plate_number",
            "make",
            "model",
            "year",
            "capacity",
            "energy",
            "status",
            "latitude",
            "longitude",
            "driver",
        )
        read_only_fields = ("id",)
