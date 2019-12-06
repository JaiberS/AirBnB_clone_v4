#!/usr/bin/python3
"""
Flask route that returns json status response
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
from flasgger.utils import swag_from
from models import storage, CNC, UserTasks
from os import environ
from json import dumps
from pdb import set_trace
STORAGE_TYPE = environ.get('HBNB_TYPE_STORAGE')


@swag_from('swagger_yaml/places_by_city.yml', methods=['GET', 'POST'])
@app_views.route('/cities/<city_id>/places', methods=['GET', 'POST'])
def places_per_city(city_id=None):
    """
        places route to handle http method for requested places by city
    """
    city_obj = storage.get('City', city_id)
    if city_obj is None:
        abort(404, 'Not found')

    if request.method == 'GET':
        all_places = storage.all('Place')
        city_places = [obj.to_json() for obj in all_places.values()
                       if obj.city_id == city_id]
        return jsonify(city_places)

    if request.method == 'POST':
        req_json = request.get_json()
        if req_json is None:
            abort(400, 'Not a JSON')
        user_id = req_json.get("user_id")
        if user_id is None:
            abort(400, 'Missing user_id')
        user_obj = storage.get('User', user_id)
        if user_obj is None:
            abort(404, 'Not found')
        if req_json.get("name") is None:
            abort(400, 'Missing name')
        Place = CNC.get("Place")
        req_json['city_id'] = city_id
        new_object = Place(**req_json)
        new_object.save()
        return jsonify(new_object.to_json()), 201


@swag_from('swagger_yaml/task_id.yml', methods=['GET', 'DELETE', 'PUT', 'POST'])
@app_views.route('/places/<task_id>', methods=['GET', 'DELETE', 'PUT', 'POST'])
def places_with_id(task_id=None):
    """
        places route to handle http methods for given place
    """
    if request.method == 'POST':
        req_json = request.get_json()
        if req_json is None:
            abort(400, 'Not a JSON')
        user_id = req_json.get("user_id")
        if user_id is None:
            abort(400, 'Missing user_id')
        user_obj = storage.get('User', user_id)
        if user_obj is None:
            abort(404, 'Not found')
        if req_json.get("description") is None:
            abort(400, 'Missing name')
        if req_json.get("state") is None:
            abort(400, 'Missing state')
        new_object = UserTasks(**req_json)
        new_object.save()
        users = storage.all('User').values()
        result = []
        for u in users:
            uj = u.to_json()
            uj.setdefault('tasks', u.u_tasks)
            result.append(uj)
        return jsonify(result), 200


    task_obj = storage.get('UserTasks', task_id)
    if task_obj is None:
        abort(404, 'Not found')

    if request.method == 'GET':
        return jsonify(place_obj.to_json())

    if request.method == 'DELETE':
        place_obj.delete()
        del place_obj
        return jsonify({}), 200

    if request.method == 'PUT':
        req_json = request.get_json()
        if req_json is None:
            abort(400, 'Not a JSON')
        task_obj.bm_update(req_json)
        users = storage.all('User').values()
        result = []
        for u in users:
            uj = u.to_json()
            uj.setdefault('tasks', u.u_tasks)
            result.append(uj)
        return jsonify(result), 200



@app_views.route('/places_search', methods=['GET', 'POST'])
def places_search():
    """
        places route to handle http method for request to search places
    """
    if request.method == 'GET':
        users = storage.all('User').values()
        result = []
        for u in users:
            uj = u.to_json()
            uj.setdefault('tasks', u.u_tasks)
            result.append(uj)
        return jsonify(result)

    if request.method == 'POST':
        req_json = request.get_json()
        if req_json is None:
            abort(400, 'Not a JSON')
        users = storage.all('User').values()
        result = []
        for u in users:
            if u.id in req_json['users'] or len(req_json['users']) == 0:
                uj = u.to_json()
                uj.setdefault('tasks', u.u_tasks)
                result.append(uj)
        return jsonify(result)
