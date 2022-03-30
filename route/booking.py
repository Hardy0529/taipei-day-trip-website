from flask import *
import mysql.connector.pooling

booking = Blueprint('booking', __name__,
                    static_folder="static", template_folder="templates")
app.secret_key = "hello"

dbconfig = {
    "host": "localhost",
    "user": "root",
    "password": "12345678",
    "database": "taipei-attractions"
}
db = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="taipei-attractions",
    **dbconfig
)


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
            try:
                attractionId = request.json["attractionId"]
                date = request.json["date"]
                time = request.json["time"]
                price = request.json["price"]

                con = db.get_connection()
                cursor = con.cursor(dictionary=True)
                cursor.execute(
                    """
                    SELECT `stitle`,`address`,`file`
                    FROM `attractions`
                    WHERE `_id` = %s
                """, (attractionId,))
                bookingCheck = cursor.fetchone()
                if bookingCheck == None:
                    return jsonify({"error": True, "message": "建立失敗，輸入不正確或其他原因"}), 400
                else:
                    session["attractionId"] = attractionId
                    session["stitle"] = bookingCheck["stitle"]
                    session["address"] = bookingCheck["address"]
                    session["file"] = bookingCheck["file"]
                    session["date"] = date
                    session["time"] = time
                    session["price"] = price
                    print("Post成功")
                    return jsonify({"ok": True}), 200
            except:
                return jsonify({"error": True, "message": "伺服器內部錯誤"}), 500
            finally:
                con.close()
        else:
            return jsonify({"erro": True, "message": "未登入系統，拒絕存取"}), 403
    if request.method == "DELETE":
        if "email" in session:
            session.pop("attractionId", None)
            return jsonify({"ok": True}), 200
        else:
            return jsonify({"erro": True, "message": "未登入系統，拒絕存取"}), 403
