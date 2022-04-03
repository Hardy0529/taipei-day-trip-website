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


class Booking_Moel:
    def api_booking_Moel_con(self, attractionId):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                        SELECT `stitle`,`address`,`file`
                        FROM `attractions`
                        WHERE `_id` = %s
                    """, (attractionId,))
            booking_data = cursor.fetchone()
            return booking_data
        except:
            return "error"
        finally:
            con.close()


        # api 取得下一頁旅遊景點列表資料
booking_Moel = Booking_Moel()
