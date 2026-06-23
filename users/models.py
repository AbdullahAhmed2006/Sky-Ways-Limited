# models.py
"""Custom user model with role‑based access control."""
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True)
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("dispatcher", "Dispatcher"),
        ("driver", "Driver"),
        ("passenger", "Passenger"),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="dispatcher")
    profile_image = models.ImageField(
        upload_to='profile_photos/',
        blank=True,
        null=True,
        help_text="User profile picture"
    )
    security_question = models.CharField(max_length=255, blank=True)
    security_answer = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
