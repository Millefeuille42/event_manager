from modules.users_module import os, do_authenticated_request, g, interfaces


def get_user_data(user_id):
    if user_id == "me":
        target = os.environ['api_url'] + "/v2/" + user_id
    else:
        target = os.environ['api_url'] + "/v2/users/" + user_id
    data = do_authenticated_request(target, g.token)
    if data['code'] != 200:
        return data['text'], data['code']
    return interfaces.UserData(data['text']).data
