from flask import request
import uuid

connectedUsers = []
typingUsers = []

def joinControl(socket, data):
    data['user']['sid'] = request.sid
    isUserInList = False
    for item in connectedUsers:
        if item['user']['sid'] == request.sid:
            isUserInList = True
            break
    if not isUserInList:
        connectedUsers.append(data)
    message = {"type": "broadcast", "roomId": data['roomId'], "key": str(uuid.uuid4()), "sender": "system", "content": f"{data['user']['username']} entrou no chat!"}
    socket.emit('broadcastMessage', message, broadcast=True)
    socket.emit('broadcastUserList', connectedUsers, broadcast=True)
    print(f"{data['user']['username']} connected to room: {data['roomId']}")

def messageControl(socket, message):
    print('message send: ' + message['content'])
    socket.emit('broadcastMessage', message, broadcast=True)

def typingControl(socket, data):
    if data['type'] == "start":
        hasItem = False
        for item in typingUsers:
            if item['key'] == data['key']:
                hasItem = True
                break
        if not hasItem:
            typingUsers.append(data)
    else:
        for item in typingUsers:
            if item['key'] == data['key']:
                typingUsers.remove(item)
    socket.emit('broadcastTyping', typingUsers)

def exitControl(socket):
    data = None
    for item in connectedUsers:
        if item['user']['sid'] == request.sid:
            data = item
            connectedUsers.remove(item)
            break
    if data:
        message = {"type": "broadcast", "roomId": data['roomId'], "key": str(uuid.uuid4()), "sender": "system", "content": f"{data['user']['username']} saiu do chat!"}
        socket.emit('broadcastMessage', message, broadcast=True)
        socket.emit('broadcastUserList', connectedUsers, broadcast=True)
        print(f"{data['user']['username']} disconnected of room: {data['roomId']}")