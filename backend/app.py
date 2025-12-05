from flask import Flask, request, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True, methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
app.config['SECRET_KEY'] = 'your_secret_key' # Replace with a strong, random key

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login' # Define the login view if not logged in

class User(UserMixin):
    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password_hash = generate_password_hash(password)

    def get_id(self):
        return str(self.id)

# In a real application, you would use a database (e.g., SQLAlchemy)
users_db = {
    1: User(1, "test@gmail.com", "1234")
}

@login_manager.user_loader
def load_user(user_id):
    return users_db.get(int(user_id))

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = next((u for u in users_db.values() if u.email == email), None)

    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        return jsonify({
                'message': 'Logged in successfully', 
                'token': user.password_hash
            }), 200

    return jsonify({'message': 'Incorrect email or password. Please try again.'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)