from django.urls import path
from .views import RoleViewSet

urlpatterns = [
    path('api/admin/role/', RoleViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='role-list-create'),
    path('api/admin/role/<int:pk>/', RoleViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='role-detail'),
]