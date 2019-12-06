#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid

# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    after each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    storage.close()


@app.route('/4-hbnb/')
def hbnb_filters(the_id=None):
    """
    handles request to custom template with states, cities & amentities
    """
    users = storage.all('User').values()
    tasks = storage.all('UserTasks').values()
    print(users)
    return render_template('4-hbnb.html',
                           tasks=tasks,
                           users=users,
                           cache_id=str(uuid.uuid4()))


if __name__ == "__main__":
    """
    MAIN Flask App"""
    app.run(host=host, port=port)
