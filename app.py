from flask import Flask, render_template, send_from_directory

import json
import os
from datetime import datetime
from pathlib import Path
from flask import flash, redirect, render_template, request, url_for

app = Flask(__name__, static_folder=None)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "change-me-in-production")


@app.get("/style.css")
def style_css():
    return send_from_directory(app.root_path, "style.css")


@app.get("/menu.css")
def menu_css():
    return send_from_directory(app.root_path, "menu.css")

@app.get("/about.css")
def about_css():
    return send_from_directory(app.root_path, "about.css")

@app.get("/contact.css")
def contact_css():
    return send_from_directory(app.root_path, "contact.css")


@app.get("/script.js")
def script_js():
    return send_from_directory(app.root_path, "script.js")


@app.get("/images/<path:filename>")
def image_file(filename):
    return send_from_directory(f"{app.root_path}/images", filename)

@app.route("/")
def home():
    return render_template("Home.html")

@app.route("/menu")
def menu():
    return render_template("menu.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")


ENQUIRIES_FILE = Path(__file__).parent / "enquiries.jsonl"


if __name__ == "__main__":
    app.run(debug=True)