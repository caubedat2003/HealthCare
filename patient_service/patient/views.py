from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Patient
from .serializers import PatientSerializer
import logging

logger = logging.getLogger(__name__)

class PatientProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.debug(f"User: {request.user}, User ID: {request.user.id if request.user.is_authenticated else 'Not authenticated'}, Token: {request.auth}")
        if not request.user.is_authenticated:
            return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)
        if Patient.objects.filter(user_id=request.user.id).exists():
            return Response({"error": "Patient profile already exists for this user."}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['user_id'] = request.user.id
        serializer = PatientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)