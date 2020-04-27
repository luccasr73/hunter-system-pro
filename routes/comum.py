from flask import Blueprint, request, render_template

comum = Blueprint('comum', __name__, url_prefix="/",
                  template_folder='../view')


@comum.route("/")
def index():
    return "home"


@comum.route("/login")
def login():
    return "login"


@comum.route("/recuperarsenha")
def recuperarsenha():
    return "recuperarsenha"


@comum.route("/cadastro")
def cadastro():
    return "cad"
