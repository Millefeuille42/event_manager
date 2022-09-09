from flask import render_template
from . import events


@events.route("/events", methods=['Get'])
def get_events():
    return 'Hello World!'


@events.route("/events/subscribed", methods=['Get'])
def get_subscribed():
    return 'Hello World!'


@events.route('/events/managed', methods=['Get'])
def get_managed():
    return 'Hello World!'


@events.route('/events/<id>', methods=['Get'])
def get_id():
    return 'Hello World!'
