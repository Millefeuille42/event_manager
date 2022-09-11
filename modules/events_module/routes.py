from . import events
from . import services
from ..auth_module.guard import login_required


@events.route("/events/campus/<campus_id>", methods=['Get'])
@login_required
def get_events(campus_id):
    return services.get_events_per_campus(campus_id)


@events.route("/events/user/<user_id>", methods=['Get'])
@login_required
def get_subscribed(user_id):
    return services.get_user_subscribed_events(user_id)


@events.route('/events/id/<event_id>', methods=['Get'])
@login_required
def get_id(event_id):
    return services.get_event_per_id(event_id)
