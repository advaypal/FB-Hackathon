from flask import Flask, render_template, request
import os
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/sample', methods=['GET'])
def sampleAPI():
    # request.args.get('id', '')
    return json.dumps([
        "Hi I am a little basi who likes to whooski with his titchy doggy friends while playing football",
        "Bye you little basi of a doggy catty bumyum"
    ])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
