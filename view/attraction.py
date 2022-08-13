from flask import *


# api 取得分頁的旅遊景點列表資料
class Attraction_page_View:
    def attraction_page_render(self, page_attraction, nextpage):
        if page_attraction == "error":
            return jsonify({"data": True, "message": "查無此筆資料"}), 500
        else:
            # 將資料組成所需的格式
            attractionsData = []
            for page_attraction_Item in page_attraction:

                # 篩選圖片
                page_attraction_Img_Data = []
                for page_attraction_Img in page_attraction_Item["file"].split('https://')[1:]:
                    if page_attraction_Img[len(page_attraction_Img)-3:len(page_attraction_Img)] == "jpg" or page_attraction_Img[len(page_attraction_Img)-3:len(page_attraction_Img)] == "JPG":
                        page_attraction_Img_Data.append(
                            "http://"+page_attraction_Img)

                dataPageJson = {
                    "id": page_attraction_Item["_id"],
                    "name": page_attraction_Item["stitle"],
                    "category": page_attraction_Item["CAT2"],
                    "description": page_attraction_Item["xbody"],
                    "address": page_attraction_Item["address"],
                    "transport": page_attraction_Item["info"],
                    "mrt": page_attraction_Item["MRT"],
                    "latitude": page_attraction_Item["latitude"],
                    "longitude": page_attraction_Item["longitude"],
                    "images": page_attraction_Img_Data
                }
                attractionsData.append(dataPageJson)
            return jsonify({"nextPage": nextpage, "data": attractionsData}), 200


# api 根據關鍵字取得景點資料列表
class Attraction_keyword_View:
    def attraction_keyword_render(self, page_attraction_keyword, nextpage):
        if page_attraction_keyword == "error":
            return jsonify({"data": True, "message": "查無此筆資料"}), 500
        else:
            # 將資料組成所需的格式
            attractionsKeyword = []
            for keywordItem in page_attraction_keyword:

                # 篩選圖片
                keyword_attraction_Img_Data = []
                for keyword_attraction_Img in keywordItem["file"].split('https://')[1:]:
                    if keyword_attraction_Img[len(keyword_attraction_Img)-3:len(keyword_attraction_Img)] == "jpg" or keyword_attraction_Img[len(keyword_attraction_Img)-3:len(keyword_attraction_Img)] == "JPG":
                        keyword_attraction_Img_Data.append(
                            "http://"+keyword_attraction_Img)

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
                    "images": keyword_attraction_Img_Data
                }
                attractionsKeyword.append(dataKeywordJson)
            return jsonify({"nextPage": nextpage, "data": attractionsKeyword}), 200


# api 根據景點編號取得景點資料
class Attraction_path_View:
    def attraction_path_render(self, path_attraction):
        if path_attraction == "error":
            return jsonify({"data": True, "message": "查無此筆資料"}), 500
        elif path_attraction == None:
            return jsonify({"data": True, "message": "查無此筆資料"}), 400
        else:
            # 篩選圖片
            path_attractionData = []
            for img in path_attraction["file"].split('https://')[1:]:
                if img[len(img)-3:len(img)] == "jpg" or img[len(img)-3:len(img)] == "JPG":
                    path_attractionData.append("http://"+img)
            # 將資料組成所需的格式
            dataRouteJson = {
                "id": path_attraction["_id"],
                "name": path_attraction["stitle"],
                "category": path_attraction["CAT2"],
                "description": path_attraction["xbody"],
                "address": path_attraction["address"],
                "transport": path_attraction["info"],
                "mrt": path_attraction["MRT"],
                "latitude": path_attraction["latitude"],
                "longitude": path_attraction["longitude"],
                "images": path_attractionData
            }
            return jsonify({"data": dataRouteJson}), 200


# api 取得分頁的旅遊景點列表資料
attraction_page_View = Attraction_page_View()
# api 根據關鍵字取得景點資料列表
attraction_keyword_View = Attraction_keyword_View()
# api 根據景點編號取得景點資料
attraction_path_View = Attraction_path_View()
