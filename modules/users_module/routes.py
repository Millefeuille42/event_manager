from __main__ import app
from . import users


@users.route('/users/me', methods=['Get'])
def get_me():
    return 'Hello World!'


# This route also works for logins
@users.route('/users/<id>', methods=['Get'])
def get_subscribed_events():
    return 'Hello World!'


@users.route('/users/<id>', methods=['Post'])
def get_subscribed_events():
    return 'Hello World!'


@users.route('/users/<id>', methods=['Patch'])
def get_subscribed_events():
    return 'Hello World!'

