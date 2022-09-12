class UserData:
    def __init__(self, data):
        self.data = {
            'login': data['login'],
            'email': data['email'],
            'url': data['url'],
            'image_url': data['image_url'],
        }
