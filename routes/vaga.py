from flask import Blueprint, request, render_template

vaga = Blueprint('vaga', __name__, url_prefix="/admin",
                  template_folder='../view')

@vaga.route("/vaga")
def index():
    return "vaga"