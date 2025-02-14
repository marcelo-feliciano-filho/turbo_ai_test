from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Ensures unique emails

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]  # Username is still required

    def __str__(self):
        return self.email
