import os
import requests
from flask import g
from .interfaces import UserData


def get_user_data(user_id):
    if user_id == "me":
        target = os.environ['api_url'] + "/v2/" + user_id
    else:
        target = os.environ['api_url'] + "/v2/users/" + user_id
    print(target)
    try:
        response = requests.get(target, headers={'Authorization': 'Bearer ' + g.token})
        if response.status_code != 200:
            return {'text': "Error", 'code': response.status_code}
    except Exception as err:
        print(err)
        return {'text': "Unknown Error", 'code': 520}
    return UserData(response.json()).data
