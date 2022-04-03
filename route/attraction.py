from flask import *
from model.attraction import *
from view.attraction import *

attraction = Blueprint('attraction', __name__,
                       static_folder="static", template_folder="templates")


# 供前端 使用的 API 要求字串 - [查詢旅遊景點資料]
@attraction.route('/api/attractions', methods=['GET'])
def api_query_attraction():
    # 取得頁數要求字串
    page = request.args.get("page", 0)
    # 關鍵字
    keyword = request.args.get("keyword", None)
    # 抓取第幾筆資料
    getPage = (int(page)*12)
    # 抓取下一頁地幾筆資料
    next = (int(page)+1)*12
    # api 顯示下一頁資料
    nextpage = int(page)+1

    # 取得分頁資料
    if keyword == None:
        nextPage_attraction = attraction_nextPage_Moel.api_nextPage_attraction_con(
            next)
        if nextPage_attraction == []:
            nextpage = None

        page_attraction = attraction_page_Moel.api_page_attraction_con(getPage)
        return attraction_page_View.attraction_page_render(page_attraction, nextpage)

    # 取得關鍵字資料
    if keyword != None:
        nextPage_attraction_keyword = attraction_nextPage_keyword_Moel.api_nextPage_keyword_attraction_con(
            keyword, next)

        if nextPage_attraction_keyword == []:
            nextpage = None

        page_attraction_keyword = attraction_nextPage_keyword_Moel.api_nextPage_keyword_attraction_con(
            keyword, getPage)
        return attraction_keyword_View.attraction_keyword_render(page_attraction_keyword, nextpage)


# 供前端 使用的 API 路由 - [查詢旅遊景點資料]
@attraction.route('/api/attraction/<attractionId>', methods=['GET'])
def api_path_attraction(attractionId):
    path_attraction = attraction_path_Moel.api_path_attraction_con(
        attractionId)
    return attraction_path_View.attraction_path_render(path_attraction)
