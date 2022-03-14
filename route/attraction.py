from flask import Blueprint, render_template, request, jsonify
import mysql.connector

attraction = Blueprint('attraction', __name__,
                       static_folder="static", template_folder="templates")


# 連接到 MySQL 資料庫
website = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="12345678",
    database="taipei-attractions"
)
cursor = website.cursor()


# 供前端 使用的 API 要求字串 - [查詢旅遊景點資料]
@attraction.route('/api/attractions', methods=['GET'])
def api_searchQueryString():
    # 取得要求字串
    page = request.args.get("page", 0)
    getPage = (int(page)*12)
    keyword = request.args.get("keyword", None)

    # 取得分頁資料
    selectPage = "SELECT * FROM `attractions` ORDER BY `_id` LIMIT %s ,12"
    dataPage = (getPage,)
    cursor.execute(selectPage, dataPage)
    pageItems = cursor.fetchall()

    if keyword == None:
        # 將資料組成所需的格式
        attractionsData = []
        for pageItem in pageItems:
            dataPageJson = {
                "id": pageItem[0],
                "name": pageItem[1],
                "category": pageItem[2],
                "description": pageItem[3],
                "address": pageItem[4],
                "transport": pageItem[5],
                "mrt": pageItem[6],
                "latitude": pageItem[7],
                "longitude": pageItem[8],
                "images": [f"https://{routeItemImg}" for routeItemImg in pageItem[9].split('https://')[1:]]
            }
            attractionsData.append(dataPageJson)

        return jsonify({"nextPage": int(page)+1, "data": attractionsData})

    # 取得關鍵字資料
    cursor.execute(
        "SELECT * FROM `attractions` WHERE `stitle` LIKE '%"+keyword+"%' ORDER BY `_id` LIMIT %s ,12", (getPage,))
    keywordItems = cursor.fetchall()

    if keyword != None:
        if keywordItems == []:
            erroData = {
                "erro": True,
                "message": "查無此筆資料"
            }
            return erroData
        else:
            # 將資料組成所需的格式
            attractionsKeyword = []
            for keywordItem in keywordItems:
                dataKeywordJson = {
                    "id": keywordItem[0],
                    "name": keywordItem[1],
                    "category": keywordItem[2],
                    "description": keywordItem[3],
                    "address": keywordItem[4],
                    "transport": keywordItem[5],
                    "mrt": keywordItem[6],
                    "latitude": keywordItem[7],
                    "longitude": keywordItem[8],
                    "images": [f"https://{keywordItemImg}" for keywordItemImg in keywordItem[9].split('https://')[1:]]
                }
                attractionsKeyword.append(dataKeywordJson)
            return jsonify({"nextPage": int(page)+1, "data": attractionsKeyword})


# 供前端 使用的 API 路由 - [查詢旅遊景點資料]
@attraction.route('/api/attraction/<attractionId>', methods=['GET'])
def api_searchRoute(attractionId):
    # 取得路由資料
    cursor.execute("""
        SELECT * 
        FROM `attractions` 
        WHERE `_id` = %s
    """, (attractionId,))
    routeItem = cursor.fetchone()

    if routeItem == None:
        erroRouteData = {
            "erro": True,
            "message": "查無此筆資料"
        }
        return erroRouteData
    else:
        # 分割圖片網址並組合字串
        picLinkRoute = routeItem[9].split('https://')
        firstPicLinkRoute = 'https://' + picLinkRoute[1]

        attractionsRoute = []
        dataRouteJson = {
            "id": routeItem[0],
            "name": routeItem[1],
            "category": routeItem[2],
            "description": routeItem[3],
            "address": routeItem[4],
            "transport": routeItem[5],
            "mrt": routeItem[6],
            "latitude": routeItem[7],
            "longitude": routeItem[8],
            "images": [firstPicLinkRoute]
        }
        attractionsRoute.append(dataRouteJson)
        return jsonify({"data": attractionsRoute})
