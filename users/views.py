# views.py
"""User viewsets for registration and profile management."""
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """Read‑only access to user list/profile. Only admin can list all users; a user can retrieve their own profile."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Admins and dispatchers can see all, regular users only themselves
        user = self.request.user
        if user.role in ["admin", "dispatcher"]:
            return User.objects.all()
        return User.objects.filter(id=user.id)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny], url_path='reset_password')
    def reset_password(self, request):
        email = request.data.get("email", "").strip()
        phone_number = request.data.get("phone_number", "").strip()
        security_question = request.data.get("security_question", "").strip()
        security_answer = request.data.get("security_answer", "").strip()
        new_password = request.data.get("new_password", "")

        if not email or not phone_number or not security_question or not security_answer or not new_password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Look up user matching email and phone_number
        try:
            user = User.objects.get(email__iexact=email, phone_number=phone_number)
        except User.DoesNotExist:
            return Response({"error": "User with this email and phone number not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check security question and answer
        if user.security_question != security_question:
            return Response({"error": "Incorrect security question details."}, status=status.HTTP_400_BAD_REQUEST)

        if user.security_answer.strip().lower() != security_answer.strip().lower():
            return Response({"error": "Incorrect security question answer."}, status=status.HTTP_400_BAD_REQUEST)

        # Update password
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)

class RegisterViewSet(viewsets.GenericViewSet):
    """Open endpoint for user registration (any role, default dispatcher)."""
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user, context=self.get_serializer_context()).data, status=status.HTTP_201_CREATED)
