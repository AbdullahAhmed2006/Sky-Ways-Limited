# serializers.py
"""Trip serializers for core trip models."""
from rest_framework import serializers
from .models import Route, Booking, Trip, TripStop

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ("id", "name", "start_location", "end_location", "distance_km", "geometry")
        read_only_fields = ("id",)

class BookingSerializer(serializers.ModelSerializer):
    driver_name = serializers.SerializerMethodField()
    driver_image = serializers.SerializerMethodField()
    driver_license = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = (
            "id",
            "passenger_name",
            "passenger_contact",
            "pickup_point",
            "destination",
            "scheduled_date",
            "scheduled_time",
            "passengers",
            "route",
            "vehicle",
            "driver",
            "status",
            "notes",
            "driver_name",
            "driver_image",
            "driver_license",
        )
        read_only_fields = ("id",)

    def get_driver_name(self, obj):
        if obj.driver and obj.driver.user:
            return obj.driver.user.get_full_name() or obj.driver.user.username
        return None

    def get_driver_image(self, obj):
        if obj.driver and obj.driver.profile_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.driver.profile_image.url)
            return obj.driver.profile_image.url
        return None

    def get_driver_license(self, obj):
        if obj.driver:
            return obj.driver.license_number
        return None


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = (
            "id",
            "booking",
            "vehicle",
            "driver",
            "start_timestamp",
            "end_timestamp",
            "distance_travelled_km",
            "status",
        )
        read_only_fields = ("id",)

class TripStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripStop
        fields = ("id", "trip", "location_name", "arrival_time", "departure_time", "sequence")
        read_only_fields = ("id",)
