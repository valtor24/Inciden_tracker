import bcrypt
import mysql.connector
from flask import Flask, request, jsonify

app = Flask(__name__)

def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",  # o el usuario de BD que corresponda
        password="holamundoCafeLeche.*",
        database="incident_tracker"
    )

@app.route('/login', methods=['POST'])
def login():
    try:
        datos = request.get_json()
        username = datos['username']
        password_ingresada = datos['password']

        conexion = conectar_bd()
        cursor = conexion.cursor(dictionary=True)

        # Buscar si existe el usuario
        cursor.execute("SELECT id, username, password FROM users WHERE username = %s", (username,))
        usuario = cursor.fetchone()

        if usuario:
            # Si el usuario existe, verificar contraseña
            password_guardada = usuario['password'].encode('utf-8')  # convertir a bytes

            if bcrypt.checkpw(password_ingresada.encode('utf-8'), password_guardada):
                # Responder con éxito
                return jsonify({
                    "success": True,
                    "message": "Login exitoso"
                }), 200
            else:
                # Si la contraseña es incorrecta
                return jsonify({
                    "success": False,
                    "message": "Contraseña incorrecta"
                }), 401
        else:
            # Si el usuario no existe
            return jsonify({
                "success": False,
                "message": "Usuario no encontrado"
            }), 404
    except Exception as e:
        print("Error en el servidor:", e)
        return jsonify({
            "success": False,
            "message": "Error en el servidor"
        }), 500
