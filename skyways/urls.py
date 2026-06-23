# urls.py
"""skyways URL Configuration
The API root routes to each modular app with versioned prefix.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # JWT authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.home, name='home'),
    # Versioned API routes
    path('api/v1/users/', include('users.urls')),
    path('api/v1/fleet/', include('fleet.urls')),
    path('api/v1/trips/', include('trips.urls')),
    path('api/v1/operations/', include('operations.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
