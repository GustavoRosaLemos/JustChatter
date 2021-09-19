from routes.chat.chat import loadChatRoutes
from flask import Flask, app
from flask_socketio import SocketIO
from flask_cors import CORS
import os

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)
CORS(app)

loadChatRoutes(app)


if __name__ == '__main__':
    app.run(debug=True, host=os.getenv('DOMAIN'), port=os.getenv('PORT'))