# HealthCare Website System

## 1. Giới thiệu

Hệ thống **Website HealthCare** được xây dựng dựa trên kiến trúc **Microservices**, nhằm cung cấp một nền tảng quản lý y tế toàn diện cho nhiều vai trò khác nhau trong hệ thống y tế.

### Các chức năng chính:

- **Đăng ký / Đăng nhập**

- **Patient (Bệnh nhân)**:
  - Tạo hồ sơ cá nhân
  - Đặt lịch hẹn khám
  - Xem hồ sơ bệnh án

- **Doctor (Bác sĩ)**:
  - Tạo hồ sơ cá nhân
  - Xem danh sách lịch hẹn
  - Tạo hồ sơ bệnh án cho bệnh nhân

- **Admin (Quản trị viên)**:
  - Quản lý người dùng
  - Quản lý vai trò

- **Các vai trò khác** *(đang cập nhật)*:
  - Nurse (Y tá)
  - Laboratory Technician (Kỹ thuật viên xét nghiệm)
  - Insurance Provider (Nhà cung cấp bảo hiểm)
  - Notification Service (Dịch vụ thông báo)

---
## 2. Cách chạy ứng dụng

- Clone repo về máy

- Tải Docker Desktop + WSL2

- Trong terminal vs code, chạy lệnh:

    + docker-compose up --build: tạo các container của service

    + ./migrate_all.sh (chạy trong git bash): tạo các bảng data trong mysql