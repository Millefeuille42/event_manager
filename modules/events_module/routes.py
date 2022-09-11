from . import events


@events.route("/events", methods=['Get'])
def get_events():
    return 'Hello World!'


@events.route("/events/<user_id>/subscribed", methods=['Get'])
def get_subscribed(user_id):
    return 'Hello World!'


@events.route('/events/<user_id>/managed', methods=['Get'])
def get_managed(user_id):
    return 'Hello World!'


@events.route('/events/<event_id>', methods=['Get'])
def get_id(event_id):
    return 'Hello World!'
