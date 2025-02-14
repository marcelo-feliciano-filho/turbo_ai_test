from django.conf import settings
from django.db import models
from django.utils.timezone import now

class Note(models.Model):
    CATEGORY_CHOICES = [
        ('random_thoughts', 'Random Thoughts'),
        ('personal', 'Personal'),
        ('school', 'School'),
        ('drama', 'Drama'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='random_thoughts')

    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.get_category_display()}"
