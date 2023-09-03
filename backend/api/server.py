from flask import Flask, request, jsonify
import jwt
import datetime
from functools import wraps
from dotenv import load_dotenv
import os
from .validators import isValidModel

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

users = {
    'username': 'password',
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(*args, **kwargs)

    return decorated

@app.route('/api/login', methods=['POST'])
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return jsonify({'message': 'Could not verify'}), 401

    if users.get(auth.username) == auth.password:
        token = jwt.encode({'user': auth.username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                           app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token.decode('UTF-8')})

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/benchmark', methods=['POST'])
@token_required
def benchmark():
    try:
        data = request.get_json
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return


if __name__ == '__main__':
    app.run(debug=True)
