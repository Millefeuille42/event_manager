class UserData:
    def __init__(self, data):
        campus = 0
        if 'campus' in data and len(data['campus']) > 0:
            campus = data['campus'][0]['id']

        self.data = {
            'login': data['login'],
            'email': data['email'],
            'url': data['url'],
            'image_url': data['image_url'],
            'campus': campus
        }
