from flask import *
import mysql.connector
app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True


# 連接到 MySQL 資料庫
website = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="12345678",
    database="taipei-attractions"
)
cursor = website.cursor()


# Pages


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html")


# 供前端 使用的 API 要求字串 - [查詢旅遊景點資料]
@app.route('/api/attractions', methods=['GET'])
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
            # 分割圖片網址並組合字串
            picLinkPage = pageItem[9].split('https://')
            firstPicLinkPage = 'https://' + picLinkPage[1]

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
                "images": firstPicLinkPage
            }
            attractionsData.append(dataPageJson)

        return jsonify({"nextPage": int(page), "data": attractionsData})

    # 取得關鍵字資料
    cursor.execute(
        "SELECT * FROM `attractions` WHERE `stitle` LIKE '%"+keyword+"%'")
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
                # 分割圖片網址並組合字串
                picLink = keywordItem[9].split('https://')
                firstPicLink = 'https://' + picLink[1]

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
                    "images": firstPicLink
                }
                attractionsKeyword.append(dataKeywordJson)
            return jsonify({"nextPage": int(page), "data": attractionsKeyword})


# 供前端 使用的 API 路由 - [查詢旅遊景點資料]
@app.route('/api/attraction/<attractionId>', methods=['GET'])
def api_searchRoute(attractionId):
    # 取得路由資料
    selectRoute = "SELECT * FROM `attractions` WHERE `_id` = %s"
    dataRoute = (attractionId,)
    cursor.execute(selectRoute, dataRoute)
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
            "images": firstPicLinkRoute
        }
        attractionsRoute.append(dataRouteJson)
        return jsonify({"data": attractionsRoute})


@app.route("/booking")
def booking():
    return render_template("booking.html")


@app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


app.run(host="0.0.0.0", port=3000)
