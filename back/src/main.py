from routes.auth.auth import loadAuthRoutes
from routes.chat.chat import loadChatSockets, loadChatRoutes
from flask import Flask, app, request
from flask_socketio import SocketIO
from flask_cors import CORS
import os

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)
socket = SocketIO(app, cors_allowed_origins='*')

loadChatRoutes(app)
loadChatSockets(socket)
loadAuthRoutes(app, request)

if __name__ == '__main__':
    app.run(debug=True, host=os.getenv('DOMAIN'), port=os.getenv('PORT'))