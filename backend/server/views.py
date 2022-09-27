from __init__ import app, request, events, users, auth


@app.before_request
def before_request():
    if request.method == "OPTIONS":
        return "OK", 200


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Methods'] = "GET, OPTIONS"
    header['Access-Control-Allow-Headers'] = 'authorization'
    app.logger.error(request.path + " - " + response.status)
    return response


# Import all routes blueprint from modules
app.register_blueprint(events)
app.register_blueprint(users)
app.register_blueprint(auth)
