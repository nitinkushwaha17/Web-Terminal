from flask import Flask, render_template, redirect, url_for, request
import subprocess
app = Flask(__name__)

s = subprocess.run('cd', shell=True, capture_output=True).stdout.decode() + "$ "


@app.route('/')
def home():
    return render_template('index.html', content=s)


@app.route('/cmd', methods=['POST', 'GET'])
def chk():
    global s
    a = request.form['inp']
    if a == "cls":
        s = subprocess.run('cd', shell=True, capture_output=True).stdout.decode() + "$ "
        return redirect('/')
    s += a
    return redirect(url_for('cmd', name=a))


@app.route('/cmd/<name>')
def cmd(name):
    global s
    c = subprocess.run(name, shell=True, capture_output=True).stdout.decode()

    if c == "":
        c = subprocess.run(name, shell=True, capture_output=True).stderr.decode()

    cd = subprocess.run('cd', shell=True, capture_output=True).stdout.decode()
    s += "\n" + c + "\n\n" + cd + "$ "
    return render_template('index.html', content=s)


app.run()

