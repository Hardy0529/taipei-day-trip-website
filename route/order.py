from flask import *
import requests
import ssl
from model.booking import *
from view.booking import *
import mysql.connector.pooling
import json
import datetime

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

order = Blueprint('order', __name__,
                  static_folder="static", template_folder="templates")
app.secret_key = "hello"


@order.route("/api/orders", methods=["POST", "GET"])
def orders():
    if request.method == "POST":
        if "email" in session:

            try:
                con = db.get_connection()
                cursor = con.cursor(dictionary=True)
                # 訂購人ID
                loginID = session["id"]
                # 訂購人
                contactName = request.json["order"]["contact"]["name"]
                contactEmail = request.json["order"]["contact"]["email"]
                contactPhone = request.json["order"]["contact"]["phone"]
                if contactName == "" or contactEmail == "" or contactPhone == "":
                    return jsonify({"error": True, "message": "訂單建立失敗，輸入不正確"}), 400

                # 景點
                iD = request.json["order"]["trip"]["attraction"]["id"]
                name = request.json["order"]["trip"]["attraction"]["name"]
                address = request.json["order"]["trip"]["attraction"]["address"]
                image = request.json["order"]["trip"]["attraction"]["image"]

                date = request.json["order"]["trip"]["date"]
                time = request.json["order"]["trip"]["time"]
                price = request.json["order"]["price"]

                # 狀態與訂單編號
                status = 1
                now = datetime.datetime.now()
                nowTime = str(now).replace("-", "").replace(" ",
                                                            "").replace(":", "").replace(".", "")
                orderId = str(loginID) + nowTime
                print(orderId)

                cursor.execute(
                    """
                        SELECT `stitle`,`address`,`file`
                        FROM `attractions`
                        WHERE `_id` = %s AND `stitle` = %s AND `address` = %s
                    """, (iD, name, address))
                order_data = cursor.fetchone()
                if order_data == None:
                    return jsonify({"error": True, "message": "訂單建立失敗，輸入不正確"}), 400
                else:
                    cursor.execute(
                        """
                            INSERT INTO
                            `order`(`number`,`price`,`id`,`name`,`address`,`image`,`date`,`time`,`contactName`,`contactEmail`,`contactPhone`,`status`)
                            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                        """, (orderId, price, iD, name, address, image, date, time, contactName, contactEmail, contactPhone, status))
                    con.commit()

                    post_data = {
                        "prime": request.json["prime"],
                        "partner_key": "partner_zuDcIOqG1JrM8vTVNHMtcdTbo0HrWXUYEpt0wi84LkxXFjqSPvvZ4XQH",
                        "merchant_id": "Jeff0529_CTBC",
                        "amount": 1,
                        "currency": "TWD",
                        "details": "TapPay Test",
                        "cardholder": {
                            "phone_number": request.json["order"]["contact"]["phone"],
                            "name": request.json["order"]["contact"]["name"],
                            "email": request.json["order"]["contact"]["email"]
                        },
                        "remember": False
                    }

                    ssl._create_default_https_context = ssl._create_unverified_context
                    url = "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime"
                    res = requests.post(url, json=post_data, headers={
                        "Content-Type": "application/json",
                        "x-api-key": "partner_zuDcIOqG1JrM8vTVNHMtcdTbo0HrWXUYEpt0wi84LkxXFjqSPvvZ4XQH"
                    })
                    res_json = json.loads(res.text)
                    print(res_json)

                    if res_json["status"] == 0:
                        cursor.execute(
                            "UPDATE `order` SET `status` = '%s' WHERE `number` = '"+orderId+"';", (res_json["status"], ))
                        con.commit()

                        orderSucces = {
                            "number": orderId,
                            "payment": {
                                "status": res_json["status"],
                                "message": "付款成功"
                            }
                        }

                        return jsonify({"data": orderSucces}), 200
                    elif res_json["status"] != 0:
                        cursor.execute(
                            "UPDATE `order` SET `status` = '%s' WHERE `number` = '"+orderId+"';", (res_json["status"], ))
                        con.commit()

                        orderError = {
                            "number": orderId,
                            "payment": {
                                "status": res_json["status"],
                                "message": "未付款"
                            }
                        }

                        return jsonify({"data": orderError}), 200
            except:
                return jsonify({"error": True, "message": "伺服器內部錯誤"}), 500
            finally:
                con.close()

        else:
            return jsonify({"erro": True, "message": "未登入系統，拒絕存取"}), 403


@order.route("/api/order/<orderNumber>")
def orderNumber(orderNumber):
    if "email" in session:
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                    SELECT `number`,`price`,`id`,`name`,`address`,`image`,`date`,`time`,`contactName`,`contactEmail`,`contactPhone`,`status`
                    FROM `order`
                    WHERE `number` = %s
                """, (orderNumber,))
            order_Data = cursor.fetchone()
            if order_Data == None:
                return jsonify({"data": None}), 400
            else:
                order_get = {
                    "number": order_Data["number"],
                    "price": order_Data["price"],
                    "trip": {
                        "attraction": {
                            "id": order_Data["id"],
                            "name": order_Data["name"],
                            "address":  order_Data["address"],
                            "image":  order_Data["image"],
                        },
                        "date": order_Data["date"],
                        "time": order_Data["time"]
                    },
                    "contact": {
                        "name": order_Data["contactName"],
                        "email": order_Data["contactEmail"],
                        "phone": order_Data["contactPhone"]
                    },
                    "status": order_Data["status"]
                }
                return jsonify({"data": order_get}), 200
        except:
            return jsonify({"error": True, "message": "伺服器內部錯誤"}), 500
        finally:
            con.close()
    else:
        return jsonify({"erro": True, "message": "未登入系統，拒絕存取"}), 403
