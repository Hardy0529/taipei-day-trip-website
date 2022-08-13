from flask import *
from model.member import *

member = Blueprint('member', __name__,
                   static_folder="static", template_folder="templates")
app.secret_key = "hello"


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
        registerName = request.json["name"]
        registerEmail = request.json["email"]
        registerPassword = request.json["password"]

        # 連線資料庫 確認會員是否重複註冊
        check_register_member = check_register_member_Moel.check_register_member_con(
            registerEmail)

        if not check_register_member == None:
            return jsonify({"error": True, "message": "帳號已經被註冊"}), 400
        else:
            if registerName == "" or registerEmail == "" or registerPassword == "":
                return jsonify({"error": True, "message": "帳號、密碼不得為空值"}), 400
            else:
                # 連線資料庫 註冊會員
                register_member = register_member_Moel.register_member_con(
                    registerName, registerEmail, registerPassword)
                if register_member == "註冊成功":
                    return jsonify({"ok": True}), 200
    if request.method == "PATCH":

        loginEmail = request.json["email"]
        loginPassword = request.json["password"]

        if loginEmail == "" or loginEmail == "":
            return jsonify({"error": True, "message": "請輸入帳號密碼"}), 400
        else:
            # 登入會員
            login_member = login_member_Moel.login_member_con(
                loginEmail, loginPassword)
            if login_member == None:
                return jsonify({"error": True, "message": "帳號、或密碼輸入錯誤"}), 400
            else:
                if login_member["email"] != loginEmail or login_member["password"] != loginPassword:
                    return jsonify({"error": True, "message": "帳號、或密碼輸入錯誤"}), 400
                elif login_member["email"] == loginEmail and login_member["password"] == loginPassword:
                    session["id"] = login_member["id"]
                    session["name"] = login_member["name"]
                    session["email"] = login_member["email"]
                    return jsonify({"ok": True}), 200
    if request.method == "DELETE":
        session.pop("email", None)
        session.pop("attractionId", None)
        return jsonify({"ok": True}), 200
