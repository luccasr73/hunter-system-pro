from flask import Flask
import router
app = Flask(__name__, static_url_path='/static')
router.setRoutes(app)

if __name__ == '__main__':
    app.run(debug=True)