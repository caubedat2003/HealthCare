import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

logger = logging.getLogger(__name__)

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            logger.debug("No Authorization header provided")
            return None

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            logger.debug("No token found in Authorization header")
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            logger.debug(f"Token validated: user_id={validated_token.get('user_id')}, user={user}")
            return (user, validated_token)
        except InvalidToken as e:
            logger.error(f"Invalid token: {str(e)}")
            raise AuthenticationFailed(f"Token invalid: {str(e)}")
        except TokenError as e:
            logger.error(f"Token error: {str(e)}")
            raise AuthenticationFailed(f"Token error: {str(e)}")
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            raise AuthenticationFailed(f"Authentication failed: {str(e)}")