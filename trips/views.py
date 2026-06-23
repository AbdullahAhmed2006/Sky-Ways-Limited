# views.py
"""Trip app viewsets for core trip models."""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAdminOrReadOnly

from .models import Route, Booking, Trip, TripStop
from .serializers import RouteSerializer, BookingSerializer, TripSerializer, TripStopSerializer


from rest_framework.decorators import action
from rest_framework.response import Response
import math

LOCATION_COORDS = {
    "Central Station": (40.7128, -74.0060),
    "Airport Terminal 3": (40.6413, -73.7781),
    "Harbor Depot": (40.7061, -74.0130),
    "Tech Park West": (40.7484, -73.9857),
    "Downtown Terminal": (40.7580, -73.9855),
    "Depot Alpha": (40.7306, -73.9352),
    "Westway Plaza": (40.7589, -73.9938),
    "Metro Link": (40.7259, -73.9967),
}

def get_coords(location_name):
    if location_name in LOCATION_COORDS:
        return LOCATION_COORDS[location_name]
    # Stable pseudo-random coords based on hash
    h = hash(location_name)
    lat = 40.7 + (abs(h) % 100) / 1000.0
    lon = -74.0 + ((abs(h) >> 2) % 100) / 1000.0
    return (lat, lon)

def calculate_distance(p1, p2):
    # Rough approximation of distance in kilometers (Euclidean * scale)
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2) * 111.0

class RouteViewSet(viewsets.ModelViewSet):
    """CRUD for Route objects."""
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    @action(detail=True, methods=['post'], url_path='optimize')
    def optimize(self, request, pk=None):
        route = self.get_object()
        from operations.models import RouteSegment

        segments = list(route.segments.all())
        if not segments:
            return Response({"error": "No segments to optimize for this route."}, status=400)

        # Collect unique stop names
        stops = set()
        for s in segments:
            stops.add(s.start_point)
            stops.add(s.end_point)

        start_loc = route.start_location or list(stops)[0]
        
        # Nearest Neighbor Heuristic
        current = start_loc
        unvisited = list(stops)
        if current in unvisited:
            unvisited.remove(current)

        path = [current]
        while unvisited:
            current_coords = get_coords(current)
            next_stop = min(unvisited, key=lambda x: calculate_distance(current_coords, get_coords(x)))
            path.append(next_stop)
            unvisited.remove(next_stop)
            current = next_stop

        # Re-create segments in optimized order
        route.segments.all().delete()
        new_segments = []
        total_dist = 0.0

        for idx in range(len(path) - 1):
            p1 = path[idx]
            p2 = path[idx + 1]
            d_km = calculate_distance(get_coords(p1), get_coords(p2))
            d_km = round(d_km, 2)
            total_dist += d_km
            new_segments.append(RouteSegment(
                route=route,
                order=idx + 1,
                start_point=p1,
                end_point=p2,
                distance_km=d_km
            ))

        RouteSegment.objects.bulk_create(new_segments)

        old_distance = float(route.distance_km)
        route.end_location = path[-1]
        route.distance_km = round(total_dist, 2)
        route.save()

        savings = max(0.0, old_distance - float(route.distance_km))

        return Response({
            "message": "AI Route Optimization Complete.",
            "old_distance_km": old_distance,
            "new_distance_km": route.distance_km,
            "savings_km": round(savings, 2),
            "optimized_stops": path
        })


class BookingViewSet(viewsets.ModelViewSet):
    """CRUD for Booking objects."""
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Booking.objects.select_related('driver__user', 'route', 'vehicle')
        if not user or not user.is_authenticated:
            return Booking.objects.none()
        
        if user.role == 'passenger':
            from django.db.models import Q
            full_name = user.get_full_name()
            if full_name:
                return queryset.filter(Q(passenger_name__iexact=full_name) | Q(passenger_name__iexact=user.username))
            return queryset.filter(passenger_name__iexact=user.username)
        elif user.role == 'driver':
            return queryset.filter(driver__user=user)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        
        # Determine passenger name
        p_name = "Customer / Portal Booking"
        if user and user.is_authenticated:
            full_name = user.get_full_name().strip()
            p_name = full_name if full_name else user.username
        
        # Get vehicle and driver from validated_data
        vehicle_obj = serializer.validated_data.get('vehicle')
        driver_obj = serializer.validated_data.get('driver')
        
        from fleet.models import Vehicle, Driver
        if not vehicle_obj:
            vehicle_obj = Vehicle.objects.filter(status="available").first() or Vehicle.objects.first()
        if not driver_obj:
            driver_obj = Driver.objects.filter(is_active=True).first() or Driver.objects.first()
            
        serializer.save(
            passenger_name=p_name,
            vehicle=vehicle_obj,
            driver=driver_obj
        )
        
        # Broadcast booking creation via Channels
        try:
            instance = serializer.instance
            from channels.layers import get_channel_layer
            from asgiref.sync import async_to_sync
            channel_layer = get_channel_layer()
            if channel_layer:
                async_to_sync(channel_layer.group_send)(
                    "skyways_notifications",
                    {
                        "type": "send_notification",
                        "message": {
                            "type": "booking_created",
                            "booking_id": instance.id,
                            "passenger_name": instance.passenger_name,
                            "pickup_point": instance.pickup_point,
                            "destination": instance.destination,
                            "scheduled_date": str(instance.scheduled_date),
                            "scheduled_time": str(instance.scheduled_time),
                            "passengers": instance.passengers,
                            "vehicle_pk": instance.vehicle.pk if instance.vehicle else None,
                            "driver_pk": instance.driver.pk if instance.driver else None,
                            "vehicle_id": instance.vehicle.id if instance.vehicle else "",
                            "driver_id": instance.driver.id if instance.driver else "",
                            "notes": instance.notes or ""
                        }
                    }
                )
        except Exception as e:
            print("Failed to broadcast booking WebSocket notification:", e)


class TripViewSet(viewsets.ModelViewSet):
    """CRUD for Trip objects."""
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()
        self.send_trip_ws_notification(serializer.instance, "trip_dispatched")

    def perform_update(self, serializer):
        serializer.save()
        self.send_trip_ws_notification(serializer.instance, "trip_updated")

    def send_trip_ws_notification(self, instance, event_type):
        try:
            from channels.layers import get_channel_layer
            from asgiref.sync import async_to_sync
            channel_layer = get_channel_layer()
            if channel_layer:
                async_to_sync(channel_layer.group_send)(
                    "skyways_notifications",
                    {
                        "type": "send_notification",
                        "message": {
                            "type": event_type,
                            "trip_id": instance.id,
                            "booking_id": instance.booking.id if instance.booking else None,
                            "vehicle_pk": instance.vehicle.pk if instance.vehicle else None,
                            "driver_pk": instance.driver.pk if instance.driver else None,
                            "vehicle_id": instance.vehicle.id if instance.vehicle else "",
                            "driver_id": instance.driver.id if instance.driver else "",
                            "status": instance.status,
                            "distance_travelled_km": float(instance.distance_travelled_km) if instance.distance_travelled_km is not None else 0.0
                        }
                    }
                )
        except Exception as e:
            print("Failed to broadcast trip WebSocket notification:", e)


class TripStopViewSet(viewsets.ModelViewSet):
    """CRUD for TripStop objects."""
    queryset = TripStop.objects.all()
    serializer_class = TripStopSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]


