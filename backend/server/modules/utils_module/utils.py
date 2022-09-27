from . import *


def do_authenticated_request(url, token):
    try:
        response = requests.get(url, headers={'Authorization': 'Bearer ' + token})
        if response.status_code != 200:
            return {'text': "Error", 'code': response.status_code}
    except Exception as err:
        print(err)
        return {'text': "Unknown Error", 'code': 520}
    return {'text': response.json(), 'code': 200}
