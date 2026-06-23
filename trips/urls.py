# urls.py
"""URL routing for the trips app using DRF DefaultRouter."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RouteViewSet, BookingViewSet, TripViewSet, TripStopViewSet

router = DefaultRouter()
router.register(r'routes', RouteViewSet, basename='route')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'trips', TripViewSet, basename='trip')
router.register(r'tripstops', TripStopViewSet, basename='tripstop')

urlpatterns = [
    path('', include(router.urls)),
]
