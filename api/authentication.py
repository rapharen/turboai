from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils import timezone
from datetime import timedelta


class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        user, token = super().authenticate_credentials(key)

        if timezone.now() > token.created + timedelta(hours=24):
            token.delete()
            raise AuthenticationFailed('Token has expired')

        return user, token
