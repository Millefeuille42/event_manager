from functools import wraps
from flask import request
from .services import validate_token


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.args.get("token", default="none")
        token_resp = validate_token(token)
        if token_resp['code'] != 200:
            print(token_resp)
            return "Unauthorized", 401
        return f(*args, **kwargs)
    return decorated_function
