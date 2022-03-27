from flask import *
import mysql.connector.pooling

member = Blueprint('member', __name__,
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


@member.route('/api/user',  methods=["POST", "GET", "PATCH", "DELETE"])
def api_member():
    if request.method == "GET":
        if "email" in session:
            loginID = session["id"]
            loginName = session["name"]
            loginEmail = session["email"]
            memberDATA = {
                "id": loginID,
                "name": loginName,
                "email": loginEmail
            }
            return jsonify({"data": memberDATA}), 200
        else:
            return jsonify({"data": None}), 200
    if request.method == "POST":
        try:
            registerName = request.json["name"]
            registerEmail = request.json["email"]
            registerPassword = request.json["password"]
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT `name`
                FROM `member`
                WHERE `email` = %s
            """, (registerEmail,))
            registerCheck = cursor.fetchone()
            if not registerCheck == None:
                return jsonify({"error": True, "message": "帳號已經被註冊"}), 400
            else:
                if registerName == "" or registerEmail == "" or registerPassword == "":
                    return jsonify({"error": True, "message": "帳號、密碼不得為空值"}), 400
                else:
                    cursor.execute(
                        """
                        INSERT INTO
                        `member`(`name`,`email`,`password`)
                        VALUES(%s,%s,%s)
                    """, (registerName, registerEmail, registerPassword))
                    con.commit()
                    return jsonify({"ok": True}), 200
        except:
            jsonify({"error": True, "message": "伺服器內部錯誤"}), 500
        finally:
            con.close()
    if request.method == "PATCH":
        try:
            loginEmail = request.json["email"]
            loginPassword = request.json["password"]

            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT `id`,`name`,`email`,`password`
                FROM `member`
                WHERE `email` = %s;
            """, (loginEmail,))
            loginCheck = cursor.fetchone()

            if loginEmail == "" or loginEmail == "":
                return jsonify({"error": True, "message": "請輸入帳號密碼"}), 400

            elif loginCheck == None:
                return jsonify({"error": True, "message": "帳號、或密碼輸入錯誤"}), 400

            else:
                if loginCheck["email"] != loginEmail or loginCheck["password"] != loginPassword:
                    return jsonify({"error": True, "message": "帳號、或密碼輸入錯誤"}), 400

                elif loginCheck["email"] == loginEmail and loginCheck["password"] == loginPassword:
                    session["id"] = loginCheck["id"]
                    session["name"] = loginCheck["name"]
                    session["email"] = loginCheck["email"]
                    return jsonify({"ok": True}), 200

        except:
            return jsonify({"error": True, "message": "伺服器內部錯誤"}), 500

        finally:
            con.close()
    if request.method == "DELETE":
        session.pop("email", None)
        return jsonify({"ok": True}), 200
