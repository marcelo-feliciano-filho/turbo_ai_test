from rest_framework import viewsets, permissions
from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Note.objects.all()

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)  # Restrict to logged-in user's notes

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
