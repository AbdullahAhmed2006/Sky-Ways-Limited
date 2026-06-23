# models.py
"""Operations related models: maintenance, fuel, inspections, reports, scheduling, alerts, etc."""
from django.db import models
from django.conf import settings
from fleet.models import Vehicle, Driver

class MaintenanceRecord(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="maintenance_records")
    performed_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    next_due_km = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Maintenance for {self.vehicle} on {self.performed_at.date()}"

class FuelLog(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="fuel_logs")
    timestamp = models.DateTimeField(auto_now_add=True)
    liters = models.DecimalField(max_digits=6, decimal_places=2)
    price_per_liter = models.DecimalField(max_digits=6, decimal_places=2)
    odometer_km = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"Fuel {self.liters}L for {self.vehicle} at {self.timestamp.date()}"

class Inspection(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="inspections")
    inspector = models.CharField(max_length=100)
    passed = models.BooleanField()
    remarks = models.TextField(blank=True)
    inspected_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inspection {self.id} for {self.vehicle}"

class Report(models.Model):
    title = models.CharField(max_length=150)
    generated_at = models.DateTimeField(auto_now_add=True)
    content = models.JSONField()  # Stores aggregated stats, charts, etc.
    generated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title

# Additional operational entities to reach 25 total models
class Schedule(models.Model):
    """Planned future trips or vehicle assignments."""
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="schedules")
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="schedules")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Schedule {self.id} - {self.vehicle} ({self.start_time} → {self.end_time})"

class Alert(models.Model):
    """System alerts for admins/dispatchers (e.g., low fuel, maintenance due)."""
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="alerts")
    level = models.CharField(max_length=20, choices=[("info", "Info"), ("warning", "Warning"), ("critical", "Critical")])
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.level.upper()} alert for {self.vehicle}"

class Notification(models.Model):
    """User‑specific notifications (push/email)."""
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications")
    title = models.CharField(max_length=120)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.recipient}: {self.title}"

class Shift(models.Model):
    """General shift definition (e.g., morning, night)."""
    name = models.CharField(max_length=50)
    start_hour = models.TimeField()
    end_hour = models.TimeField()

    def __str__(self):
        return self.name

class DriverShift(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="shifts")
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    date = models.DateField()

    class Meta:
        unique_together = ("driver", "date", "shift")

    def __str__(self):
        return f"{self.driver} - {self.shift} on {self.date}"

class VehicleAssignment(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="assignments")
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="assignments")
    assigned_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.vehicle} ↔ {self.driver}"

class RouteSegment(models.Model):
    route = models.ForeignKey('trips.Route', on_delete=models.CASCADE, related_name="segments")
    order = models.PositiveSmallIntegerField()
    start_point = models.CharField(max_length=255)
    end_point = models.CharField(max_length=255)
    distance_km = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        ordering = ["order"]
        unique_together = ("route", "order")

    def __str__(self):
        return f"Segment {self.order} of {self.route.name}"

class TripLog(models.Model):
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE, related_name="logs")
    timestamp = models.DateTimeField(auto_now_add=True)
    event = models.CharField(max_length=255)
    details = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"Log for Trip {self.trip.id} at {self.timestamp}"

class Expense(models.Model):
    """General expense entries for fleet operations."""
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="expenses")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)
    incurred_at = models.DateField()
    note = models.TextField(blank=True)

    def __str__(self):
        return f"{self.category} - {self.amount} for {self.vehicle}"

class Revenue(models.Model):
    """Revenue generated per booking/trip."""
    booking = models.OneToOneField('trips.Booking', on_delete=models.CASCADE, related_name="revenue")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    collected_at = models.DateField()
    method = models.CharField(max_length=30, choices=[("cash", "Cash"), ("card", "Card"), ("online", "Online")])

    def __str__(self):
        return f"Revenue {self.amount} for Booking {self.booking.id}"

class DashboardMetric(models.Model):
    """Pre‑computed metrics for the admin dashboard."""
    name = models.CharField(max_length=100, unique=True)
    value = models.DecimalField(max_digits=12, decimal_places=2)
    refreshed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}: {self.value}"

class Complaint(models.Model):
    """Passenger complaints/support tickets."""
    passenger = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="complaints")
    title = models.CharField(max_length=150)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=[("pending", "Pending"), ("resolved", "Resolved")], default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Complaint {self.id} by {self.passenger.username}"

class Feedback(models.Model):
    """Passenger feedback and ratings for completed bookings."""
    booking = models.ForeignKey('trips.Booking', on_delete=models.CASCADE, related_name="feedbacks")
    passenger = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="feedbacks")
    rating = models.PositiveSmallIntegerField(default=5)  # 1 to 5 stars
    comments = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rating {self.rating} for Booking {self.booking.id}"
