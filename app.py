from flask import Flask
import router
app = Flask(__name__)

router.setRoutes(app)
 
if __name__ == '__main__':
    app.run(debug=True)