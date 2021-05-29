'''
Team Cows Go Moo :: Stella Oh, Winnie Huang, Helena Williams, Constance Chen
Softdev Pd 1
P5: This is the End
2021-05-24
'''

from flask import Flask, render_template, request, session
import os
import sqlite3
import urllib.request
import json
from db_manager import *

#Displays homepage when successful login
@app.route("/homepage", methods = ['GET', 'POST'])
def returnHome():
    db = sqlite3.connect("p5database.db")
    c4 = db.cursor()

    userList = []
    for x in c4.execute("SELECT username FROM users"):
        userList.append(x[0])
    user_index = userList.index(session["user"])

    return render_template('home.html', user = session["user"])

@app.route("/g1", methods = ['GET', 'POST'])
def loadGame1():
    db = sqlite3.connect("p5database.db")
    c = db.cursor()

    user_id = session.get("user")
    c.execute('SELECT * FROM g1')

    g1Arr = []
    for row in c:
        if (row[0] == user_id):
            g1.append(row[1]) 

    return render_template('g1.html', g1Scores = g1Arr)  

@app.route("/g1End", methods = ['GET', 'POST'])
def g1Leaderboard():
    username = session.get("user")
    catList = c.execute('SELECT * FROM cats').fetchall()[-1]
    url = catList[0]

    ##add to db
    c.execute('INSERT INTO g1 (username, points) VALUES (?,?)',(username, url)) 

@app.route("/g2", methods = ['GET', 'POST'])
def loadGame2():
    return render_template('g2.html')    

@app.route("/g3", methods = ['GET', 'POST'])
def loadGame3():
    return render_template('g3.html')   

@app.route("/g4", methods = ['GET', 'POST'])
def loadGame4():
    return render_template('g4.html')     

#Displays login page and removes user from session
@app.route("/logout", methods = ['GET', 'POST'])
def logout():
    session.pop("user", None) #removes the session
    return render_template('login.html')

if __name__ == "__main__": # true is this file is NOT imported
    app.debug = True #enable auto-reload upon code change
    app.run()