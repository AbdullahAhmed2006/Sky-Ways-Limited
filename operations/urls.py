# urls.py
"""URL routing for the operations app using DRF DefaultRouter."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MaintenanceRecordViewSet,
    FuelLogViewSet,
    InspectionViewSet,
    ReportViewSet,
    ScheduleViewSet,
    AlertViewSet,
    NotificationViewSet,
    ShiftViewSet,
    DriverShiftViewSet,
    VehicleAssignmentViewSet,
    RouteSegmentViewSet,
    TripLogViewSet,
    ExpenseViewSet,
    RevenueViewSet,
    DashboardMetricViewSet,
    ComplaintViewSet,
    FeedbackViewSet,
)

router = DefaultRouter()
router.register(r'maintenance', MaintenanceRecordViewSet, basename='maintenance')
router.register(r'fuellogs', FuelLogViewSet, basename='fuellog')
router.register(r'inspections', InspectionViewSet, basename='inspection')
router.register(r'reports', ReportViewSet, basename='report')
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'alerts', AlertViewSet, basename='alert')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'shifts', ShiftViewSet, basename='shift')
router.register(r'drivershifts', DriverShiftViewSet, basename='drivershift')
router.register(r'vehicleassignments', VehicleAssignmentViewSet, basename='vehicleassignment')
router.register(r'routesegments', RouteSegmentViewSet, basename='routesegment')
router.register(r'triplogs', TripLogViewSet, basename='triplog')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'revenues', RevenueViewSet, basename='revenue')
router.register(r'dashboardmetrics', DashboardMetricViewSet, basename='dashboardmetric')
router.register(r'complaints', ComplaintViewSet, basename='complaint')
router.register(r'feedbacks', FeedbackViewSet, basename='feedback')

urlpatterns = [
    path('', include(router.urls)),
]
