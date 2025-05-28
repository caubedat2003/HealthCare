from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Doctor
from .serializers import DoctorSerializer

class DoctorProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "No user ID provided."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            doctor = Doctor.objects.get(user_id=user_id)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor profile not found for this user."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({"error": "No user ID provided."}, status=status.HTTP_400_BAD_REQUEST)
        if Doctor.objects.filter(user_id=user_id).exists():
            return Response({"error": "Doctor profile already exists for this user."}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['id'] = user_id
        serializer = DoctorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({"error": "No user ID provided."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            doctor = Doctor.objects.get(user_id=user_id)
            serializer = DoctorSerializer(doctor, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor profile not found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
class DoctorListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)