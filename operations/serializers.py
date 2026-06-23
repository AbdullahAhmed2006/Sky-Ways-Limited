# serializers.py
"""Serializers for all operations models."""

from rest_framework import serializers
from .models import (
    MaintenanceRecord,
    FuelLog,
    Inspection,
    Report,
    Schedule,
    Alert,
    Notification,
    Shift,
    DriverShift,
    VehicleAssignment,
    RouteSegment,
    TripLog,
    Expense,
    Revenue,
    DashboardMetric,
    Complaint,
    Feedback,
)

class MaintenanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceRecord
        fields = '__all__'

class FuelLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelLog
        fields = '__all__'

class InspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inspection
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'

class DriverShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverShift
        fields = '__all__'

class VehicleAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleAssignment
        fields = '__all__'

class RouteSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RouteSegment
        fields = '__all__'

class TripLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripLog
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenue
        fields = '__all__'

class DashboardMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardMetric
        fields = '__all__'

class ComplaintSerializer(serializers.ModelSerializer):
    passenger_username = serializers.ReadOnlyField(source='passenger.username')

    class Meta:
        model = Complaint
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    passenger_username = serializers.ReadOnlyField(source='passenger.username')

    class Meta:
        model = Feedback
        fields = '__all__'
