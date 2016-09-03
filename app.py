from flask import Flask, render_template, request
import os
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/sample', methods=['GET'])
def sampleAPI():
    id1 = request.args.get('id1', '')
    id2 = request.args.get('id2', '')
    return json.dumps({
        id1: {
            'tweet': "Hi I am a little basi who likes to whooski with his titchy doggy friends while playing football",
            'img': 'http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i80/tj_tom_180x180.png'
        },
        id2: {
            'tweet': "Bye you little basi of a doggy catty bumyum",
            'img': 'http://www.easydrawingtutorials.com/images/Jerry/jerry-thumb.jpg'
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
