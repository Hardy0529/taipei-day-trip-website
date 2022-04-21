
from flask import *
import geocoder
import requests
import json
import math


location = Blueprint('location', __name__,
                     static_folder="static", template_folder="templates")


@location.route("/api/location")
def index():
    response = make_response("ok")
    response.headers["access-control-allow-origin"] = "*"

    # 3 獲取 IP
    location = geocoder.ip("me").latlng
    my_lat = location[0]
    my_lon = location[1]
    min_result = 999
    result_name = "台北"
    print(my_lat, my_lon)
    url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-EF46CCF9-7FB5-4120-AA40-CFDDA8BC249C"
    response = requests.get(url)
    data = json.loads(response.text)

    for city in data["records"]["locations"][0]["location"]:
        lat = float(city["lat"])
        lon = float(city["lon"])
        # print(lat, lon)
        result = math.sqrt(math.pow((my_lat - lat), 2) +
                           math.pow((my_lon - lon), 2))
        # print(result)

        if min_result > result:
            min_result = result
            result_name = city["locationName"]

    return jsonify({"data": result_name, "message": "ok"}), 200
