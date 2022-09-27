from modules.auth_module import wraps, request, services


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            token = request.headers["Authorization"].strip("Bearer ")   # Grab token from URI query parameters
        except:
            return "Unauthorized", 401
        token_resp = services.validate_token(token)  # Check validity of token
        if token_resp['code'] != 200:
            return "Unauthorized", 401  # If anything goes wrong, deny the request
        return f(*args, **kwargs)       # Else continue request
    return decorated_function
