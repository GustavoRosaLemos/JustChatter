from database.database import DataBase

db = DataBase()

def findChatRoom(id: str) -> dict:
    result = db.get_chat_by_id(id)
    if not result[0] == 200: return dict(message=result[1], code=result[0], content=None)
    return dict(message="Busca realizada com sucesso!", code=result[0], content=result[1])

def findChatRooms() -> dict:
    result = db.get_chats()
    if not result[0] == 200: return dict(message=result[1], code=result[0], content=None)
    return dict(message="Busca realizada com sucesso!", code=result[0], content=result[1])
