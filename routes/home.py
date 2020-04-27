from flask import Blueprint, request, render_template

home = Blueprint('home', __name__, url_prefix="/",
                  template_folder='../view')

@home.route("/")
def index():
    return "home"