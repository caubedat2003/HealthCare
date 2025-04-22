from django.db import models

# Create your models here.
class PushNotification(models.Model):
    user = models.IntegerField(on_delete=models.CASCADE, related_name='push_notifications')
    device_token = models.CharField(max_length=255)
    title = models.CharField(max_length=100)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('sent', 'Sent'), ('failed', 'Failed')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Push to {self.user.username} - {self.title}"