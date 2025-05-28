#!/bin/bash

# Danh sách các service cần migrate
services=(
  patient_service
  doctor_service
  admin_service
  pharmacy_service
  nurse_service
  insurance_service
  laboratory_service
  notification_service
)

echo "🚀 Bắt đầu migrate cho toàn bộ service..."

for service in "${services[@]}"
do
    echo "📦 Đang migrate cho service: $service ..."
    docker-compose exec "$service" python manage.py migrate
done

echo "✅ Hoàn tất migrate cho toàn bộ services."
