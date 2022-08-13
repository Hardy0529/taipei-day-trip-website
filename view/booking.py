from flask import *


class Booking_View:
    def booking_render(self, booking_data, attractionId, date, time, price):
        if booking_data == "error":
            return jsonify({"error": True, "message": "伺服器內部錯誤"}), 500
        elif booking_data == None:
            return jsonify({"error": True, "message": "建立失敗，輸入不正確或其他原因"}), 400
        else:
            session["attractionId"] = attractionId
            session["stitle"] = booking_data["stitle"]
            session["address"] = booking_data["address"]
            session["file"] = booking_data["file"]
            session["date"] = date
            session["time"] = time
            session["price"] = price
            return jsonify({"ok": True}), 200


# api 取得分頁的旅遊景點列表資料
booking_View = Booking_View()
