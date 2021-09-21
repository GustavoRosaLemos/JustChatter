from controllers.authController import loginUser
from controllers.authController import createUser
from utils.utils import hasDataContent
from utils.utils import tokenRequired
import os


from dotenv import load_dotenv
load_dotenv()

def loadAuthRoutes(app, request):
    @app.route(f"{os.getenv('API_URL')}/auth/login", methods=['POST'])
    def loginRoute():
        data = request.get_json()
        if not hasDataContent(data, ['username', 'password']) and not hasDataContent(data, ['email', 'password']):
            return dict(message="Necessário passar username/email e password no corpo da requisição", code=400, content=None), 400
        return loginUser(data)
        

    @app.route(f"{os.getenv('API_URL')}/auth/register", methods=['POST'])
    def registerRoute():
        data = request.get_json()
        if not hasDataContent(data, ['name', 'username', 'email', 'password']):
            return dict(message="Necessário passar name, username, email e password no corpo da requisição.", code=400, content=None), 400
        return createUser(data)

    @app.route(f"{os.getenv('API_URL')}/auth/validate", methods=['GET'])
    @tokenRequired
    def validateRoute():
        return dict(message="O token valido!", code=200, content=None), 200
