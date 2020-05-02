from flask import Blueprint, request, render_template, redirect, url_for
cadastro = Blueprint('cadastro', __name__, url_prefix="/",
                  template_folder='../view')

@cadastro.route("/cadastro")
def index():
    return render_template('cadastro.html')

