class EventData:
    def __init__(self, data):
        self.data = {
            'id': data['id'],
            'name': data['name'],
            'description': data['description'],
            'begin_at': data['begin_at'],
            'location': data['location'],
        }
