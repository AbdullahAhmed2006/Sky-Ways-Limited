# views.py
"""Operations app viewsets for all operational models."""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

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
from .serializers import (
    MaintenanceRecordSerializer,
    FuelLogSerializer,
    InspectionSerializer,
    ReportSerializer,
    ScheduleSerializer,
    AlertSerializer,
    NotificationSerializer,
    ShiftSerializer,
    DriverShiftSerializer,
    VehicleAssignmentSerializer,
    RouteSegmentSerializer,
    TripLogSerializer,
    ExpenseSerializer,
    RevenueSerializer,
    DashboardMetricSerializer,
    ComplaintSerializer,
    FeedbackSerializer,
)

class MaintenanceRecordViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceRecord.objects.all()
    serializer_class = MaintenanceRecordSerializer
    permission_classes = [IsAuthenticated]

class FuelLogViewSet(viewsets.ModelViewSet):
    queryset = FuelLog.objects.all()
    serializer_class = FuelLogSerializer
    permission_classes = [IsAuthenticated]

class InspectionViewSet(viewsets.ModelViewSet):
    queryset = Inspection.objects.all()
    serializer_class = InspectionSerializer
    permission_classes = [IsAuthenticated]

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticated]

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [IsAuthenticated]

class DriverShiftViewSet(viewsets.ModelViewSet):
    queryset = DriverShift.objects.all()
    serializer_class = DriverShiftSerializer
    permission_classes = [IsAuthenticated]

class VehicleAssignmentViewSet(viewsets.ModelViewSet):
    queryset = VehicleAssignment.objects.all()
    serializer_class = VehicleAssignmentSerializer
    permission_classes = [IsAuthenticated]

class RouteSegmentViewSet(viewsets.ModelViewSet):
    queryset = RouteSegment.objects.all()
    serializer_class = RouteSegmentSerializer
    permission_classes = [IsAuthenticated]

class TripLogViewSet(viewsets.ModelViewSet):
    queryset = TripLog.objects.all()
    serializer_class = TripLogSerializer
    permission_classes = [IsAuthenticated]

from users.permissions import IsAdminUserRole

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated, IsAdminUserRole]

class RevenueViewSet(viewsets.ModelViewSet):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer
    permission_classes = [IsAuthenticated, IsAdminUserRole]

class DashboardMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DashboardMetric.objects.all()
    serializer_class = DashboardMetricSerializer
    permission_classes = [IsAuthenticated]

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(passenger=self.request.user)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(passenger=self.request.user)
