import sys

from flask import Flask
from flask import request

sys.path.insert(0, "/app/server/")

from modules.auth_module import auth
from modules.events_module import events
from modules.users_module import users

app = Flask(__name__)

from views import *

