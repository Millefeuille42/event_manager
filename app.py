import os
from flask import Flask
from modules.events_module import events
from modules.users_module import users
from modules.auth_module import auth

app = Flask(__name__)

app.register_blueprint(events)
app.register_blueprint(users)
app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(os.environ['back_host'], int(os.environ['back_port']), debug=True)
