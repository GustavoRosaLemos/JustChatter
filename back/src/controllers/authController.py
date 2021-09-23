from utils.utils import decrypt, genereateSessionToken, encrypt
from database.database import DataBase

db = DataBase()

def createUser(data) -> dict:
    user = dict(email=data['email'], name=data['name'], username=data['username'], password=encrypt(data['password']))
    if db.get_user_by_email(user['email'])[0] == 200:
        return dict(message="Já existe um usuário cadastrado nesse email!", code=400, content=None)
    if db.get_user_by_username(user['username'])[0] == 200:
        return dict(message="Já existe um usuário com esse username", code=400, content=None)
    result = db.insert_user(user)
    if not result[0] == 201: return dict(message=result[1], code=result[0], content=None)
    return dict(message="Usuário cadastrado com sucesso!", code=result[0], content=result[1])

def loginUser(data) -> dict:
    invalidMessage = ""
    if "email" in data:
        invalidMessage = "Não existe nenhum usuário com esse email"
        result = db.get_user_by_email(data['email'])
    else:
        invalidMessage = "Não existe nenhum usuário com esse username"
        result = db.get_user_by_username(data['username'])
    if (not result[0] == 200):
        return dict(message=invalidMessage, code=400, content=None), 400
    if(not decrypt(result[1]['password']) == data['password']):
        del result[1]['password']
        return dict(message="A senha inserida é inválida!", code=400, content=None), 400
    del result[1]['password']
    result[1]['token'] = genereateSessionToken(result[1])
    return dict(message="Login realizado com sucesso!", code=200, content=result[1]), 200
  

