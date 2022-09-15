from flask import Flask, request
from modules.events_module import events
from modules.users_module import users
from modules.auth_module import auth

app = Flask(__name__)


@app.before_request
def before_request():
    print("Test")
    if request.method == "OPTIONS":
        return "OK", 200


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Methods'] = "GET, OPTIONS"
    header['Access-Control-Allow-Headers'] = 'authorization'

    return response


# Import all routes blueprint from modules
app.register_blueprint(events)
app.register_blueprint(users)
app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(debug=True)
