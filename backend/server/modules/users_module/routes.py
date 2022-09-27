from modules.users_module import guard, users, services


# This route also works for logins, and "me"
@users.route('/users/<user_id>/', methods=['Get'])
@guard.login_required     # This route is protected, check the user token (provided in query parameters for access grant)
def get_user(user_id):
    return services.get_user_data(user_id)

