from flask import Flask
from flask_socketio import SocketIO
from gen import generate_tweet

tweet_list = []

app = Flask(__name__)
app.debug = True
sio = SocketIO(app, cors_allowed_origins="*")

@sio.on('connect', namespace='/')
def connect(sid):
    sio.emit('tweet', {'data': tweet_list})

tweet_list = generate_tweet(10)

if __name__ == "__main__":
    sio.run(app, "localhost", 5000)