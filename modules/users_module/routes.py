from . import users
from .services import get_user_data
from ..auth_module.guard import login_required


# This route also works for logins, and "me"
@users.route('/users/<user_id>/', methods=['Get'])
@login_required
def get_user(user_id):
    return get_user_data(user_id)

