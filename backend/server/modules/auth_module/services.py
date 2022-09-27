from modules.auth_module import Fernet, uuid, os, requests, g


key = Fernet.generate_key()
fernet = Fernet(key)
states = set()


# Return 42 Oauth URL with an appended generated state for security
def construct_auth_uri():
    state = uuid.uuid4().hex
    states.add(state)
    return os.environ['api_redirect_uri'] + "&state=" + state


def validate_token(token):
    try:
        decrypted = fernet.decrypt(token.encode()).decode()  # Decrypt token grabbed earlier from URI query parameters
        response = requests.get(os.environ['api_url'] + "/oauth/token/info",
                                headers={'Authorization': 'Bearer ' + decrypted})   # Get info about token
    except Exception as err:
        print(err)
        return {'text': "Error while checking info", 'code': 520}
    if response.status_code != 200:
        return {'text': "Your token is invalid", 'code': 498}
    g.token = decrypted                             # Add the token to the request context, for latter use
    return {'text': response.text, 'code': 200}     # If there is no errors, the token is still valid


# Get authenticated token from 42
def auth_user(code, state):
    #if state not in states:         # Check state against the ones registered in memory
    #    return "State not found", 422    # If it is not found, the request is erroneous
    #states.remove(state)

    target = os.environ['api_url']
    target += "/oauth/token"
    target += "?grant_type=authorization_code"
    target += "&client_id=" + os.environ['api_uid']
    target += "&client_secret=" + os.environ['api_secret']
    target += "&code=" + code
    target += "&redirect_uri=" + os.environ['api_redirect']
    target += "&state=lol"

    try:
        response = requests.post(target)    # Request token from 42
        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
    except Exception as err:
        print(err)
        return "Error while authenticating", 520
    return fernet.encrypt(response.json()["access_token"].encode()), 200    # Return encrypted token
