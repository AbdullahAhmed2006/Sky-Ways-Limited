# serializers.py
"""User serializers for registration and profile handling."""
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "phone_number", "role", "profile_image", "security_question", "security_answer")
        read_only_fields = ("id", "role")
        extra_kwargs = {
            "security_answer": {"write_only": True}
        }

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "first_name", "last_name", "phone_number", "role", "profile_image", "security_question", "security_answer")
        extra_kwargs = {
            "role": {"default": "dispatcher"},
            "security_answer": {"write_only": True}
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
