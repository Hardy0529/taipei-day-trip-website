from flask import *
from model.booking import *
from view.booking import *

booking = Blueprint('booking', __name__,
                    static_folder="static", template_folder="templates")
app.secret_key = "hello"


@booking.route('/api/booking',  methods=["POST", "GET", "PATCH", "DELETE"])
def api_booking():
    if request.method == "GET":
        if "email" in session:
            if "attractionId" in session:
                attractionId = session["attractionId"]
                name = session["stitle"]
                address = session["address"]
                file = session["file"]

                date = session["date"]
                time = session["time"]
                price = session["price"]
                for fileData in file.split('https://')[1:2]:
                    file = fileData
                bookDataGet = {
                    "id": attractionId,
                    "name": name,
                    "address": address,
                    "image": "https://"+file
                }
                return jsonify({"data": {"attraction": bookDataGet, "date": date, "time": time, "price": price}}), 200
            else:
                return jsonify({"data": None}), 200
        else:
            return jsonify({"erro": True, "message": "未登入系統，拒絕存取"}), 403
    if request.method == "POST":
        if "email" in session:
            attractionId = request.json["attractionId"]
            date = request.json["date"]
            time = request.json["time"]
            price = request.json["price"]

            booking_data = booking_Moel.api_booking_Moel_con(attractionId)
            return booking_View.booking_render(booking_data, attractionId, date, time, price)
        else:
            return jsonify({"erro": True, "message": "未登入系統，拒絕存取"}), 403
    if request.method == "DELETE":
        if "email" in session:
            session.pop("attractionId", None)
            return jsonify({"ok": True}), 200
        else:
            return jsonify({"erro": True, "message": "未登入系統，拒絕存取"}), 403
