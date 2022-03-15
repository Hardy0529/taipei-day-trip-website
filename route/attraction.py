from flask import *
import mysql.connector.pooling

attraction = Blueprint('attraction', __name__,
                       static_folder="static", template_folder="templates")


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


# 供前端 使用的 API 要求字串 - [查詢旅遊景點資料]
@attraction.route('/api/attractions', methods=['GET'])
def api_searchQueryString():
    # 取得要求字串
    page = request.args.get("page", 0)
    getPage = (int(page)*12)
    keyword = request.args.get("keyword", None)

    # 取得分頁資料
    if keyword == None:
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT *
                FROM `attractions`
                ORDER BY `_id`
                LIMIT %s ,12
            """, (getPage,))
            date = cursor.fetchall()
            if date == []:
                return jsonify({"data": True, "message": "查無此筆資料"}), 400
            else:
                # 將資料組成所需的格式
                attractionsData = []
                for pageItem in date:
                    dataPageJson = {
                        "id": pageItem["_id"],
                        "name": pageItem["stitle"],
                        "category": pageItem["CAT2"],
                        "description": pageItem["xbody"],
                        "address": pageItem["address"],
                        "transport": pageItem["info"],
                        "mrt": pageItem["MRT"],
                        "latitude": pageItem["latitude"],
                        "longitude": pageItem["longitude"],
                        "images": [f"https://{routeItemImg}" for routeItemImg in pageItem["file"].split('https://')[1:]]
                    }
                    attractionsData.append(dataPageJson)
                return jsonify({"nextPage": int(page)+1, "data": attractionsData}), 200
        except:
            return jsonify({"data": True, "message": "查無此筆資料"}), 500
        finally:
            con.close()
    # 取得關鍵字資料
    if keyword != None:
        try:
            con = db.get_connection()
            cursor = con.cursor(dictionary=True)
            cursor.execute(" SELECT * FROM `attractions` WHERE `stitle`  LIKE '%" +
                           keyword + "%' ORDER BY `_id` LIMIT %s ,12", (getPage,))
            keywordItems = cursor.fetchall()
            print(keyword)
            if keywordItems == []:
                return jsonify({"data": True, "message": "查無此筆資料"}), 400
            else:
                # 將資料組成所需的格式
                attractionsKeyword = []
                for keywordItem in keywordItems:
                    dataKeywordJson = {
                        "id": keywordItem["_id"],
                        "name": keywordItem["stitle"],
                        "category": keywordItem["CAT2"],
                        "description": keywordItem["xbody"],
                        "address": keywordItem["address"],
                        "transport": keywordItem["info"],
                        "mrt": keywordItem["MRT"],
                        "latitude": keywordItem["latitude"],
                        "longitude": keywordItem["longitude"],
                        "images": [f"https://{keywordItemImg}" for keywordItemImg in keywordItem["file"].split('https://')[1:]]
                    }
                    attractionsKeyword.append(dataKeywordJson)
                return jsonify({"nextPage": int(page)+1, "data": attractionsKeyword}), 200
        except:
            return jsonify({"data": True, "message": "查無此筆資料"}), 500
        finally:
            con.close()


# 供前端 使用的 API 路由 - [查詢旅遊景點資料]
@attraction.route('/api/attraction/<attractionId>', methods=['GET'])
def api_searchRoute(attractionId):
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

        if routeItem == None:
            return jsonify({"data": True, "message": "查無此筆資料"}), 400
        else:
            # 將資料組成所需的格式
            dataRouteJson = {
                "id": routeItem["_id"],
                "name": routeItem["stitle"],
                "category": routeItem["CAT2"],
                "description": routeItem["xbody"],
                "address": routeItem["address"],
                "transport": routeItem["info"],
                "mrt": routeItem["MRT"],
                "latitude": routeItem["latitude"],
                "longitude": routeItem["longitude"],
                "images": [f"https://{img}" for img in routeItem["file"].split('https://')[1:]]
            }
        return jsonify({"data": dataRouteJson})
    except:
        return jsonify({"data": True, "message": "查無此筆資料"}), 500
    finally:
        con.close()
