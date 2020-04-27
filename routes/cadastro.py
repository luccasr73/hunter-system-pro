from flask import Blueprint, request, render_template, redirect, url_for
cadastro = Blueprint('cadastro', __name__, url_prefix="/",
                  template_folder='../view')

@cadastro.route("/cadastro")
def index():
    tipo = request.args.get('tipo')
    print(tipo)
    if tipo == 'candidato':
        return render_template('cadastro.html')
    if tipo == 'admin':
        return 'admin'
    if tipo != 'admin' or tipo != 'candidato':
        return redirect(url_for('home.index'))
