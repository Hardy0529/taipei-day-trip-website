from flask import *
import mysql.connector.pooling

member = Blueprint('member', __name__,
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


@member.route('/api/user')
def api_member():
    return "13"
