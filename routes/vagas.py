from flask import Blueprint, request, render_template

vagas = Blueprint('vagas', __name__, url_prefix="/vagas",
                  template_folder='../view')

@vagas.route("/")
def index():
    return 'vagas'


@vagas.route("/users")
def users():
    return "Essa e a pagina onde o admin gerencia os usuarios"
