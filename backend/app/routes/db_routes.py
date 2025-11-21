"""
Database routes untuk operasi CRUD pada Supabase
"""
from flask import Blueprint, request, jsonify
from app.supabase_client import get_supabase_client
from app.auth import require_auth, get_current_user

db_bp = Blueprint('database', __name__, url_prefix='/api/db')

# ===== CONTOH: CRUD untuk tabel 'items' =====
# Sesuaikan dengan struktur tabel Anda di Supabase

@db_bp.route('/<table_name>', methods=['GET'])
@require_auth
def get_all_records(table_name):
    """
    Get all records from a table
    
    Query params:
        - limit: Limit number of results
        - offset: Offset for pagination
        - order: Column to order by
        - ascending: true/false for order direction
    """
    try:
        supabase = get_supabase_client()
        
        # Get query parameters
        limit = request.args.get('limit', type=int)
        offset = request.args.get('offset', type=int)
        order = request.args.get('order')
        ascending = request.args.get('ascending', 'true').lower() == 'true'
        
        # Build query
        query = supabase.table(table_name).select('*')
        
        if order:
            query = query.order(order, desc=not ascending)
        
        if limit:
            query = query.limit(limit)
        
        if offset:
            query = query.offset(offset)
        
        # Execute query
        response = query.execute()
        
        return jsonify({
            "data": response.data,
            "count": len(response.data)
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to fetch records",
            "message": str(e)
        }), 400

@db_bp.route('/<table_name>/<record_id>', methods=['GET'])
@require_auth
def get_record(table_name, record_id):
    """
    Get a single record by ID
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table(table_name).select('*').eq('id', record_id).execute()
        
        if not response.data:
            return jsonify({
                "error": "Record not found"
            }), 404
        
        return jsonify({
            "data": response.data[0]
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to fetch record",
            "message": str(e)
        }), 400

@db_bp.route('/<table_name>', methods=['POST'])
@require_auth
def create_record(table_name):
    """
    Create a new record
    
    Request body: JSON object with record data
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        supabase = get_supabase_client()
        user = get_current_user()
        
        # Add user_id to data if not present
        if 'user_id' not in data and user:
            data['user_id'] = user.user.id
        
        response = supabase.table(table_name).insert(data).execute()
        
        return jsonify({
            "message": "Record created successfully",
            "data": response.data
        }), 201
        
    except Exception as e:
        return jsonify({
            "error": "Failed to create record",
            "message": str(e)
        }), 400

@db_bp.route('/<table_name>/<record_id>', methods=['PUT', 'PATCH'])
@require_auth
def update_record(table_name, record_id):
    """
    Update an existing record
    
    Request body: JSON object with fields to update
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        supabase = get_supabase_client()
        
        response = supabase.table(table_name).update(data).eq('id', record_id).execute()
        
        if not response.data:
            return jsonify({
                "error": "Record not found or update failed"
            }), 404
        
        return jsonify({
            "message": "Record updated successfully",
            "data": response.data
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to update record",
            "message": str(e)
        }), 400

@db_bp.route('/<table_name>/<record_id>', methods=['DELETE'])
@require_auth
def delete_record(table_name, record_id):
    """
    Delete a record
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table(table_name).delete().eq('id', record_id).execute()
        
        return jsonify({
            "message": "Record deleted successfully",
            "data": response.data
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to delete record",
            "message": str(e)
        }), 400

@db_bp.route('/<table_name>/search', methods=['POST'])
@require_auth
def search_records(table_name):
    """
    Search records with filters
    
    Request body:
        {
            "filters": [
                {"column": "status", "operator": "eq", "value": "active"},
                {"column": "created_at", "operator": "gte", "value": "2024-01-01"}
            ],
            "limit": 10,
            "order": "created_at",
            "ascending": false
        }
    
    Supported operators: eq, neq, gt, gte, lt, lte, like, ilike, in
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        supabase = get_supabase_client()
        
        # Start query
        query = supabase.table(table_name).select('*')
        
        # Apply filters
        filters = data.get('filters', [])
        for filter_item in filters:
            column = filter_item.get('column')
            operator = filter_item.get('operator', 'eq')
            value = filter_item.get('value')
            
            if not column or value is None:
                continue
            
            # Apply operator
            if operator == 'eq':
                query = query.eq(column, value)
            elif operator == 'neq':
                query = query.neq(column, value)
            elif operator == 'gt':
                query = query.gt(column, value)
            elif operator == 'gte':
                query = query.gte(column, value)
            elif operator == 'lt':
                query = query.lt(column, value)
            elif operator == 'lte':
                query = query.lte(column, value)
            elif operator == 'like':
                query = query.like(column, value)
            elif operator == 'ilike':
                query = query.ilike(column, value)
            elif operator == 'in':
                query = query.in_(column, value)
        
        # Apply ordering
        order = data.get('order')
        ascending = data.get('ascending', True)
        if order:
            query = query.order(order, desc=not ascending)
        
        # Apply limit
        limit = data.get('limit')
        if limit:
            query = query.limit(limit)
        
        # Execute query
        response = query.execute()
        
        return jsonify({
            "data": response.data,
            "count": len(response.data)
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Search failed",
            "message": str(e)
        }), 400
