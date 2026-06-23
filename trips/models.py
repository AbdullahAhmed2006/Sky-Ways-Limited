# models.py
"""Trip related models: Route, Booking, Trip, TripStop."""
from django.db import models
from django.conf import settings
from fleet.models import Vehicle, Driver

class Route(models.Model):
    name = models.CharField(max_length=100)
    start_location = models.CharField(max_length=255)
    end_location = models.CharField(max_length=255)
    distance_km = models.DecimalField(max_digits=6, decimal_places=2)
    geometry = models.JSONField(blank=True, null=True, help_text="GeoJSON or polyline for map rendering")

    def __str__(self):
        return self.name

class Booking(models.Model):
    passenger_name = models.CharField(max_length=100)
    passenger_contact = models.CharField(max_length=50)
    pickup_point = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    scheduled_date = models.DateField()
    scheduled_time = models.TimeField()
    passengers = models.PositiveSmallIntegerField(default=1)
    route = models.ForeignKey(Route, on_delete=models.SET_NULL, null=True, related_name="bookings")
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True, related_name="bookings")
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True, related_name="bookings")
    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("assigned", "Assigned"),
            ("started", "Started"),
            ("completed", "Completed"),
            ("canceled", "Canceled"),
        ],
        default="pending",
    )
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Booking {self.id} – {self.passenger_name}"

class Trip(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="trip")
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True)
    start_timestamp = models.DateTimeField()
    end_timestamp = models.DateTimeField(null=True, blank=True)
    distance_travelled_km = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ("ongoing", "Ongoing"),
            ("finished", "Finished"),
            ("cancelled", "Cancelled"),
        ],
        default="ongoing",
    )

    def __str__(self):
        return f"Trip {self.id} for Booking {self.booking.id}"

class TripStop(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="stops")
    location_name = models.CharField(max_length=255)
    arrival_time = models.DateTimeField(null=True, blank=True)
    departure_time = models.DateTimeField(null=True, blank=True)
    sequence = models.PositiveSmallIntegerField(help_text="Order of the stop in the trip")

    class Meta:
        ordering = ["sequence"]

    def __str__(self):
        return f"Stop {self.sequence} for Trip {self.trip.id}" 
