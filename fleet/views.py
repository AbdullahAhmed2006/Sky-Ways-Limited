# views.py
"""Fleet app viewsets for Driver and Vehicle models."""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsNotPassenger

from .models import Driver, Vehicle
from .serializers import DriverSerializer, VehicleSerializer


class DriverViewSet(viewsets.ModelViewSet):
    """CRUD for Driver profiles. Restricted from Passenger users."""
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [IsAuthenticated, IsNotPassenger]

    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()
        if user:
            user.delete()


class VehicleViewSet(viewsets.ModelViewSet):
    """CRUD for Vehicle entities. Restricted from Passenger users."""
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, IsNotPassenger]
