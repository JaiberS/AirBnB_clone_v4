from flask import Blueprint
app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')
from api.v1.views.index import *  # noqa
from api.v1.views.users import *  # noqa
from api.v1.views.places import *  # noqa
