from flask import Flask, render_template, request
import os
import json

app = Flask(__name__)


@app.route('/')
def index():
    return "Hi"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)