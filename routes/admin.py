from flask import Blueprint, request, render_template

admin = Blueprint('admin', __name__, url_prefix="/admin",
                  template_folder='../view')

@admin.route("/admin")
def index():
    return "admin"