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


# api 取得下一頁旅遊景點列表資料
class Attraction_nextPage_Moel:
    def api_nextPage_attraction_con(self, nextPage):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                        SELECT *
                        FROM `attractions`
                        ORDER BY `_id`
                        LIMIT %s ,12
                    """, (nextPage,))
            dateNextpage = cursor.fetchall()
            return dateNextpage
        except:
            return "error"
        finally:
            con.close()


# api 取得分頁的旅遊景點列表資料
class Attraction_page_Moel:
    def api_page_attraction_con(self, page):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                    SELECT *
                    FROM `attractions`
                    ORDER BY `_id`
                    LIMIT %s ,12
                """, (page,))
            datePage = cursor.fetchall()
            return datePage
        except:
            return "error"
        finally:
            con.close()


# api 根據關鍵字取得下一頁景點資料列表
class Attraction_nextPage_keyword_Moel:
    def api_nextPage_keyword_attraction_con(self, keyword, next):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(" SELECT * FROM `attractions` WHERE `stitle`  LIKE '%" +
                           keyword + "%' ORDER BY `_id` LIMIT %s ,12", (next,))
            keywordDateNextPage = cursor.fetchall()
            return keywordDateNextPage
        except:
            return "error"
        finally:
            con.close()


# api 根據關鍵字取得景點資料列表
class Attraction_keyword_Moel:
    def api_keyword_attraction_con(self, keyword, page):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(" SELECT * FROM `attractions` WHERE `stitle`  LIKE '%" +
                           keyword + "%' ORDER BY `_id` LIMIT %s ,12", (page,))
            keywordDataPage = cursor.fetchall()
            return keywordDataPage
        except:
            return "error"
        finally:
            con.close()


# api 根據景點編號取得景點資料
class Attraction_path_Moel:
    def api_path_attraction_con(self, attractionId):
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            # 取得路由資料
            cursor.execute(
                """
                SELECT *
                FROM `attractions`
                WHERE `_id` = %s
            """, (attractionId,))
            routeItem = cursor.fetchone()
            return routeItem
        except:
            return "error"
        finally:
            con.close()


# api 取得下一頁旅遊景點列表資料
attraction_nextPage_Moel = Attraction_nextPage_Moel()
# api 取得分頁的旅遊景點列表資料
attraction_page_Moel = Attraction_page_Moel()
# api 根據關鍵字取得下一頁景點資料列表
attraction_nextPage_keyword_Moel = Attraction_nextPage_keyword_Moel()
# api 根據關鍵字取得景點資料列表
attraction_keyword_Moel = Attraction_keyword_Moel()
# api 根據景點編號取得景點資料
attraction_path_Moel = Attraction_path_Moel()
