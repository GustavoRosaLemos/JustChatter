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
        