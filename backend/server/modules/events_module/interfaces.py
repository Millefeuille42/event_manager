class EventData:
    def __init__(self, data):
        self.data = {
            'id': data['id'],
            'name': data['name'],
            'description': data['description'],
            'begin_at': data['begin_at'],
            'location': data['location'],
            "kind": data['kind']
        }


class EventUsersData:
    def __init__(self, data):
        url_len = len(data['user']['new_image_url'])
        url = data['user']['new_image_url'][:url_len - 5]
        self.data = {
            'login': data['user']['login'],
            'url': url
        }
