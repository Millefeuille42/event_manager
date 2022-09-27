from modules.auth_module import auth, services, request


# Get the 42 Oauth link
@auth.route('/auth', methods=['Get'])
def get_auth_link():
    return services.construct_auth_uri()


# Get your authenticated token from 42
@auth.route('/auth/response', methods=['Get'])
def authenticate_user():
    args = request.args
    return services.auth_user(args.get("code"), args.get("state"))
