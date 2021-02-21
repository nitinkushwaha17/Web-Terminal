from flask import Flask, render_template, request, jsonify
import subprocess
app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def home():
    if(request.method == 'POST'):
        jsn = request.get_json()
        cmd = jsn['cmd']
        subproces = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT).stdout
        s = subproces.decode('utf-8')

        return jsonify({"out": s})
    else:
        return render_template('index.html')
    

app.run()

