import json
import mysql.connector


# 讀取 JSON 檔案
with open("taipei-attractions.json", mode="r") as file:
    attractionsData = json.load(file)


# 取得所有景點
attractionList = attractionsData["result"]["results"]


# 創建連線
mydb = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="12345678",
    database="taipei-attractions")


# 建立 cursor 開始使用
mycursor = mydb.cursor()


# 將資料整理，寫進MySql資料庫
for attraction in attractionList:
    id = attraction.get("_id")
    name = attraction.get("stitle")
    category = attraction.get("CAT2")
    description = attraction.get("xbody")
    address = attraction.get("address")
    transport = attraction.get("info")
    mrt = attraction.get("MRT")
    latitude = attraction.get("latitude")
    longitude = attraction.get("longitude")
    images = attraction.get("file")

    mycursor.execute("INSERT INTO `attractions`(`_id`,`stitle`,`CAT2`,`xbody`,`address`,`info`,`MRT`,`latitude`,`longitude`,`file`) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                     (id, name, category, description, address, transport, mrt, latitude, longitude, images))
    mydb.commit()
mydb.close()
