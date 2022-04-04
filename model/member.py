import mysql.connector.pooling

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


# 會員是否重複註冊
class Check_register_member_Moel:
    def check_register_member_con(self, registerEmail):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT `name`
                FROM `member`
                WHERE `email` = %s
            """, (registerEmail,))
            check_register_member = cursor.fetchone()
            return check_register_member
        except:
            return "error"
        finally:
            con.close()


# 會員註冊
class Register_member_Moel:
    def register_member_con(self, registerName, registerEmail, registerPassword):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                    INSERT INTO
                    `member`(`name`,`email`,`password`)
                    VALUES(%s,%s,%s)
                """, (registerName, registerEmail, registerPassword))
            con.commit()
            return "註冊成功"
        except:
            return "error"
        finally:
            con.close()


# 會員登入
class Login_member_Moel:
    def login_member_con(self, loginEmail, loginPassword):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                    SELECT `id`,`name`,`email`,`password`
                    FROM `member`
                    WHERE `email` = %s and `password` = %s;
                """, (loginEmail, loginPassword))
            check_login_member = cursor.fetchone()
            return check_login_member

        except:
            return "error"
        finally:
            con.close()


# 會員是否重複註冊
check_register_member_Moel = Check_register_member_Moel()
# 會員註冊
register_member_Moel = Register_member_Moel()
# 會員登入
login_member_Moel = Login_member_Moel()
