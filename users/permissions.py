# permissions.py
"""Custom permission classes for role‑based access control."""
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminUserRole(BasePermission):
    """Allow access only to users with role == 'admin' or 'dispatcher'."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role in ["admin", "dispatcher"])

class IsAdminOrReadOnly(BasePermission):
    """Read‑only for any authenticated user; write access only for admins/dispatchers."""
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return bool(request.user and request.user.is_authenticated and request.user.role in ["admin", "dispatcher"])

class IsNotPassenger(BasePermission):
    """Allow access only to admin, dispatcher, and driver roles."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role in ["admin", "dispatcher", "driver"])
