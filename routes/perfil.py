from flask import Blueprint, request, render_template

perfil = Blueprint('perfil', __name__, url_prefix="/admin",
                  template_folder='../view')

@perfil.route("/perfil")
def index():
    return "perfil"