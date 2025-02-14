from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom Serializer to return user info along with tokens"""
    def validate(self, attrs):
        data = super().validate(attrs)
        data["username"] = self.user.username  # Add extra user info if needed
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom Token View"""
    serializer_class = CustomTokenObtainPairSerializer
