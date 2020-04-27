from flask import Blueprint, request, render_template

cadastro = Blueprint('cadastro', __name__, url_prefix="/",
                  template_folder='../view')

@cadastro.route("/cadastro")
def index():
    return "cadastro"