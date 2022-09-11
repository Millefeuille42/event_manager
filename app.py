import os
from flask import Flask
from modules.events_module import events
from modules.users_module import users

app = Flask(__name__)

app.register_blueprint(events)

if __name__ == '__main__':
    app.run(os.environ['back_host'], int(os.environ['back_port']), debug=True)
