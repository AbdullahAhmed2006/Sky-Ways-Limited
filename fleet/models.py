# models.py
"""Fleet app models: Driver and Vehicle."""
from django.db import models
from django.conf import settings

class Driver(models.Model):
    """One‑to‑one extension of the custom User for drivers."""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "driver"},
        related_name="driver_profile",
    )
    license_number = models.CharField(max_length=30, unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    profile_image = models.ImageField(
        upload_to='driver_photos/',
        blank=True,
        null=True,
        help_text="Driver profile picture"
    )

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.license_number})"

class Vehicle(models.Model):
    """Vehicle entity with optional GPS and driver assignment."""
    vin = models.CharField(max_length=17, unique=True)
    plate_number = models.CharField(max_length=10, unique=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    capacity = models.PositiveSmallIntegerField(help_text="Number of passengers")
    energy = models.PositiveSmallIntegerField(default=100, help_text="Fuel or battery percentage")

    STATUS_CHOICES = [
        ("available", "Available"),
        ("in_service", "In Service"),
        ("maintenance", "Maintenance"),
        ("offline", "Offline"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="available")

    # GPS coordinates (optional)
    latitude = models.DecimalField(max_digits=8, decimal_places=5, null=True, blank=True)
    longitude = models.DecimalField(max_digits=8, decimal_places=5, null=True, blank=True)

    driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vehicles",
    )

    def __str__(self):
        return f"{self.make} {self.model} ({self.plate_number})"
