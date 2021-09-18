from controllers.chatController import findChatRoom
from controllers.chatController import findChatRooms
import os

def loadChatRoutes(app) -> None:
    @app.route(f"{os.getenv('API_URL')}/chat/room/<string:id>", methods=['GET'])
    def roomRoute(id): return findChatRoom(id)

    @app.route(f"{os.getenv('API_URL')}/chat/rooms", methods=['GET'])
    def roomsRoute(): return findChatRooms()
