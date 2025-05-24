from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Patient
from .serializers import PatientSerializer
import logging

logger = logging.getLogger(__name__)

class PatientProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user_id = request.query_params.get('user_id')
        logger.debug(f"Received user_id for GET: {user_id}")
        if not user_id:
            return Response({"error": "No user ID provided."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            patient = Patient.objects.get(user_id=user_id)
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response({"error": "Patient profile not found for this user."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        user_id = request.data.get('user_id')
        logger.debug(f"Received user_id for POST: {user_id}")
        if not user_id:
            return Response({"error": "No user ID provided."}, status=status.HTTP_400_BAD_REQUEST)
        if Patient.objects.filter(user_id=user_id).exists():
            return Response({"error": "Patient profile already exists for this user."}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['user_id'] = user_id
        serializer = PatientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user_id = request.data.get('user_id')
        logger.debug(f"Received user_id for PATCH: {user_id}")
        if not user_id:
            return Response({"error": "No user ID provided."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            patient = Patient.objects.get(user_id=user_id)
            serializer = PatientSerializer(patient, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Patient.DoesNotExist:
            return Response({"error": "Patient profile not found for this user."}, status=status.HTTP_404_NOT_FOUND)