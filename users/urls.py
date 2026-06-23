# urls.py
"""URL routing for the users app using DRF DefaultRouter."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RegisterViewSet

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    # Register endpoint must come BEFORE the router to avoid conflict
    path('register/', RegisterViewSet.as_view({'post': 'create'}), name='user-register'),
    path('', include(router.urls)),
]

