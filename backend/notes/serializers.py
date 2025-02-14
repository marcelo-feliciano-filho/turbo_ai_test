from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "category", "user", "created_at", "last_updated"]
        read_only_fields = ["user", "created_at", "last_updated"]
