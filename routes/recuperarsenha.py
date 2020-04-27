from flask import Blueprint, request, render_template

recuperarsenha = Blueprint('recuperarsenha', __name__, url_prefix="/",
                  template_folder='../view')


@recuperarsenha.route("/recuperarsenha")
def index():
    return "recuperarsenha"