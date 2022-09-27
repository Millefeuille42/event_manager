from flask import Blueprint
import os
from flask import g
from . import interfaces
from modules.utils_module import do_authenticated_request
from modules.auth_module import guard

events = Blueprint('events', __name__)

from . import routes, services, interfaces
