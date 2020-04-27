from routes.vagas import vagas
from routes.comum import comum
def setRoutes(app):
    app.register_blueprint(vagas)
    app.register_blueprint(comum)