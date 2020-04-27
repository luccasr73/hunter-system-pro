from flask import Blueprint, request, render_template

login = Blueprint('login', __name__, url_prefix="/",
                  template_folder='../view')

@login.route("/login")
def index():
    return "login"