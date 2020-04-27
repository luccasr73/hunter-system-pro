from routes.vagas import vagas
from routes.admin import admin
from routes.home import home
from routes.cadastro import cadastro
from routes.login import login
from routes.perfil import perfil
from routes.vaga import vaga


def setRoutes(app):
    app.register_blueprint(vagas)
    app.register_blueprint(admin)
    app.register_blueprint(home)
    app.register_blueprint(cadastro)
    app.register_blueprint(login)
    app.register_blueprint(perfil)
    app.register_blueprint(vaga)
