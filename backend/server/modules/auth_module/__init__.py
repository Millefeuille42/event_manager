from flask import Blueprint, g, request
from cryptography.fernet import Fernet
from functools import wraps
import requests
import os
import uuid
import redis

auth = Blueprint('auth', __name__)
redis_client = redis.StrictRedis(
    host=os.getenv("redis_host"),
    port=int(os.getenv("redis_port")),
    password=os.getenv("redis_password"),
    charset="utf-8",
    decode_responses=True
)

from . import routes, guard, services
