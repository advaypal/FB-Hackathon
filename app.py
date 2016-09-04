from flask import Flask, render_template, request
import os
import json
from twitter_stuff import *
from flask.ext.bower import Bower

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/tweets', methods=['GET'])
def get_tweets():
    screen_name1 = request.args.get('id1', '')
    screen_name2 = request.args.get('id2', '')
    # take ids, work magic, return tweets
    tweet1 = getText(screen_name1, "You are")
    tweet2 = getText(screen_name2, "You are")
    img1 = getImage(screen_name1)
    img2 = getImage(screen_name2)
    return json.dumps({
        screen_name1: {
            'tweet': tweet1,
            'img': img1
        },
        screen_name2: {
            'tweet': tweet2,
            'img': img2
        }
    })
    
Bower(app)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
