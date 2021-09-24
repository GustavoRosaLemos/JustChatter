import datetime
import os
from flask import jsonify, request
import jwt
from functools import wraps
from cryptography.fernet import Fernet

from dotenv import load_dotenv
load_dotenv()

def hasDataContent(json: list, neededFieldsName: list) -> bool:
    for item in neededFieldsName:
        if not item in json:
            return False
    return True

def tokenRequired(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        bearer = request.headers.get('Authorization')
        if not bearer:
            return jsonify({"message": "Necessário passar o token de autenticação!", "code": 400, "content": None}), 400
        try:
            token = bearer.split()[1]
            jwt.decode(token, os.getenv('AUTH_KEY'), "HS256")
        except:
            return jsonify({"message": "Token inválido!", "code": 401, "content": None}), 401
        return f(*args, **kwargs)
    return decorated

def generateExpirationTime():
    return datetime.datetime.utcnow() + datetime.timedelta(hours=24)

def genereateToken() -> str:
    expire = generateExpirationTime()
    token = jwt.encode({"exp": expire}, os.getenv('AUTH_KEY'))
    print(token)
    return token

def genereateSessionToken(user: dict) -> str:
    expire = generateExpirationTime()
    token = jwt.encode({"user": user, "exp": expire}, os.getenv('AUTH_KEY'))
    print(token)
    return token

def encrypt(content: str) -> str:
    key = bytes(os.getenv('ENCRYPT_KEY').encode())
    f = Fernet(key)
    token = f.encrypt(bytes(content.encode()))
    return str(token.decode())

def decrypt(content: str) -> str:
    f = Fernet(bytes(os.getenv('ENCRYPT_KEY').encode()))
    return str(f.decrypt(bytes(content.encode())).decode())