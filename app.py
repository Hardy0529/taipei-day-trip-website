from flask import *
from route.attraction import attraction
from route.member import member

app = Flask(__name__)
# 景點API
app.register_blueprint(attraction)

# 會員系統API
app.register_blueprint(member)


# 保持傳遞給 jsonify() 函數的示例搜索的順序
app.config['JSON_SORT_KEYS'] = False
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
# connector.pooling Key
app.secret_key = "mysecretkey"

# Pages


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html")


@app.route("/booking")
def booking():
    return render_template("booking.html")


@app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


app.run(host="0.0.0.0", port=3000, debug=True)
