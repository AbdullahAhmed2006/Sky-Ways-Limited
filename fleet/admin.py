# admin.py
from django.contrib import admin
from .models import Driver, Vehicle

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ("user", "license_number", "phone_number", "is_active")
    search_fields = ("user__username", "license_number")

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("plate_number", "make", "model", "year", "status", "driver")
    list_filter = ("status", "make")
    search_fields = ("plate_number", "vin")
