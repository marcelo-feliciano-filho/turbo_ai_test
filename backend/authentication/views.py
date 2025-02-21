from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }


@api_view(['POST'])
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        user, created = User.objects.get_or_create(email=email, defaults={'username': email})

        if created:
            user.set_password(password)
            user.save()
        else:
            if not user.check_password(password):
                return Response({'error': 'User already exists with a different password.'},
                                status=status.HTTP_400_BAD_REQUEST)

        authenticated_user = authenticate(username=user.username, password=password)
        if authenticated_user is None:
            return Response({'error': 'Authentication failed after registration.'}, status=status.HTTP_400_BAD_REQUEST)

        login(request, authenticated_user)

        tokens = get_tokens_for_user(authenticated_user)

    return Response(tokens, status=status.HTTP_200_OK)


class LoginView(APIView):
    """Handles user login"""

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            authenticated_user = authenticate(username=user.email, password=password)

            if authenticated_user:
                login(request, authenticated_user)
                token, _ = Token.objects.get_or_create(user=authenticated_user)
                return Response(get_tokens_for_user(user), status=status.HTTP_200_OK)

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
