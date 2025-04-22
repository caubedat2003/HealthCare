from django.db import models

# Create your models here.
class EmailNotification(models.Model):
    user_id = models.IntegerField(on_delete=models.CASCADE, related_name='email_notifications')
    recipient_email = models.EmailField()
    subject = models.CharField(max_length=255)
    body = models.TextField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('sent', 'Sent'), ('failed', 'Failed')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Email to {self.recipient_email} - {self.subject}"