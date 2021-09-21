from controllers.chatController import findChatRoom
from controllers.chatController import findChatRooms
import os

def loadChatRoutes(app) -> None:
    @app.route(f"{os.getenv('API_URL')}/chat/room/<string:id>", methods=['GET'])
    def roomRoute(id): return findChatRoom(id)

    @app.route(f"{os.getenv('API_URL')}/chat/rooms", methods=['GET'])
    def roomsRoute(): return findChatRooms()

def loadChatSockets(socket) -> None:
    @socket.on('joinedChat')
    def joined(roomId):
        print('user conneted to: ' + roomId)

    @socket.on('chatMessage')
    def sendMessage(message):
        print('message send: ' + message['content'])
        socket.emit('broadcastMessage', message, broadcast=True)
