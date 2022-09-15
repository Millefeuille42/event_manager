import os
from flask import g
from . import interfaces
from backend.app.utils import do_authenticated_request


def get_events_per_campus(campus_id):
    target = os.environ['api_url'] + "/v2/campus/" + campus_id + "/events"
    data = do_authenticated_request(target, g.token)
    if data['code'] != 200:
        return data['text'], data['code']
    ret = []
    for event in data['text']:
        ret.append(interfaces.EventData(event).data)
    return ret


def get_user_subscribed_events(user_id):
    target = os.environ['api_url'] + "/v2/users/" + user_id + "/events"
    data = do_authenticated_request(target, g.token)
    if data['code'] != 200:
        return data['text'], data['code']
    ret = []
    for event in data['text']:
        ret.append(interfaces.EventData(event).data)
    return ret


def get_event_per_id(event_id):
    target = os.environ['api_url'] + "/v2/events/" + event_id + "/events_users"
    data = do_authenticated_request(target, g.token)
    if data['code'] != 200:
        return data['text'], data['code']
    ret = []
    for event in data['text']:
        ret.append(interfaces.EventUsersData(event).data)
    return ret
