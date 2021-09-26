from controllers.socketController import joinControl, messageControl, typingControl, exitControl
from controllers.chatController import findChatRoom, findChatRooms
from werkzeug.wrappers import request
from utils.utils import tokenRequired
import os

def loadChatRoutes(app) -> None:
    @app.route(f"{os.getenv('API_URL')}/chat/room/<string:id>", methods=['GET'])
    @tokenRequired
    def roomRoute(id): return findChatRoom(id)

    @app.route(f"{os.getenv('API_URL')}/chat/rooms", methods=['GET'])
    @tokenRequired
    def roomsRoute(): return findChatRooms()

def loadChatSockets(socket) -> None:
    @socket.on('joinedChat')
    def joined(data: dict):
        joinControl(socket, data)

    @socket.on('chatMessage')
    def sendMessage(message):
        messageControl(socket, message)

    @socket.on('Typing')
    def Typing(data):
        typingControl(socket, data)

    @socket.on('disconnect')
    def diconnect():
        exitControl(socket)
       

