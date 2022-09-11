import os
import uuid
import requests
from cryptography.fernet import Fernet
from flask import g

key = Fernet.generate_key()
fernet = Fernet(key)
states = set()


def construct_auth_uri():
    state = uuid.uuid4().hex
    states.add(state)
    return os.environ['back_redirect_uri'] + "&state=" + state


def validate_token(token):
    decrypted = fernet.decrypt(token).decode()
    try:
        response = requests.get(os.environ['api_url'] + "/oauth/token/info",
                                headers={'Authorization': 'Bearer ' + decrypted})
    except Exception as err:
        print(err)
        return {'text': "Error while checking info", 'code': 520}
    if response.status_code != 200:
        return {'text': "Your token is invalid", 'code': 498}
    g.token = decrypted
    return {'text': response.text, 'code': 200}


def auth_user(code, state):
    if state not in states:
        return "Not found", 404
    states.remove(state)

    target = os.environ['api_url']
    target += "/oauth/token"
    target += "?grant_type=authorization_code"
    target += "&client_id=" + os.environ['api_uid']
    target += "&client_secret=" + os.environ['api_secret']
    target += "&code=" + code
    target += "&redirect_uri=" + os.environ['api_redirect']
    target += "&state=" + state

    try:
        response = requests.post(target)
        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
    except Exception as err:
        print(err)
        return "Error while authenticating", 520
    return fernet.encrypt(response.json()["access_token"].encode()), 200

