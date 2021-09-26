from utils.utils import genereateSessionToken
import pymongo
import os
from bson.objectid import ObjectId

from dotenv import load_dotenv
load_dotenv()

class DataBase:
    def __init__(self) -> None:
        self.conn = pymongo.MongoClient(os.getenv('DATABASE_URL'), ssl=True, ssl_cert_reqs='CERT_NONE')
        self.db = self.conn["justchatter"]
        self.chats = self.db["chats"]
        self.users = self.db["users"]


    def get_chat_by_id(self, id) -> tuple:
        try:
            cursor = self.chats.find_one({"_id": ObjectId(id)})
            if cursor:
                cursor["_id"] = str(cursor["_id"])
                return (200, cursor)
            raise Exception("Failed to find chat room")
        except:
            return (400, "Falha ao buscar pela sala!")

    def get_chats(self) -> tuple:
        try:
            cursor = self.chats.find({})
            if cursor:
                result = []
                for chat in cursor:
                    chat['_id'] = str(chat['_id'])
                    result.append(chat)
                return (200, result)
            raise Exception("Failed to find chat rooms")
        except:
            return (400, "Falha ao buscar pelas salas!")

    def get_user_by_username(self, username) -> list:
        try:
            cursor = self.users.find_one({"username": username})
            if cursor:
                cursor["_id"] = str(cursor["_id"])
                return [200, cursor]
            return [400, "Não há nenhum usuário com esse username"]
        except:
            return [500, "Falha ao buscar pelo usuário"]

    def get_user_by_email(self, email) -> list:
        try:
            cursor = self.users.find_one({"email": email})
            if cursor:
                cursor["_id"] = str(cursor["_id"])
                return [200, cursor]
            return [400, "Não há nenhum usuário com esse email"]
        except:
            return [500, "Falha ao buscar pelo usuário"]

    def insert_user(self, user: dict) -> tuple:
        cursor = self.users.insert_one(user)
        if cursor:
            del user['password']
            print(str(user))
            token = genereateSessionToken(dict(user, _id=str(cursor.inserted_id)))
            return (201, dict(user, _id=str(cursor.inserted_id), token=token))
        raise Exception("Failed to insert user in database.")
  
        