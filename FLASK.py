import mysql.connector
from flask import Flask, request, jsonify
from flask import request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import time

#-------------------------------------------------------------
app = Flask(__name__)
CORS(app)

class Cliente:

    def __init__(self, host, user, password, database):

        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.conn.cursor()

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:

            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios (
            Id_usuario INT,
            Nombre VARCHAR(30) NOT NULL,
            Apellido VARCHAR(30) NOT NULL,
            Correo VARCHAR(50) NOT NULL,
            Edad INT(11) NOT NULL,
            Fecnac DATE NOT NULL,
            Imagen_url VARCHAR(255))''')
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

#=============================================================
# MOSTRAR EL LISTADO DE TODOS LOS USUARIOS
    def listar_usuarios(self):
        self.cursor.execute("SELECT * FROM usuarios")
        usuarios = self.cursor.fetchall()
        return usuarios
    
#=============================================================
# MOSTRAR USUARIO POR SU ID
    def mostrar_usuario(self, id_usuario):
        self.cursor.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (id_usuario,))
        return self.cursor.fetchone()

#=============================================================
# DAR DE ALTA UN USUARIO
    def agregar_usuario(self, id_usuario, nombre, apellido, correo, edad, fecnac, imagen):

    # Verificamos si ya existe un usuario con el mismo id
        self.cursor.execute(f"SELECT * FROM usuarios WHERE id_usuario = {id_usuario}")
        correo_existe = self.cursor.fetchone()
        if correo_existe:
            return False
        
    # Si el id no existe, agregamos el nuevo usuario a la tabla
        sql = "INSERT INTO usuarios (id_usuario, nombre, apellido, correo, edad, fecnac, imagen_url) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        valores = (id_usuario, nombre, apellido, correo, edad, fecnac, imagen)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True

#=============================================================
# BORRAR UN USUARIO POR SU ID
    def borrar_usuario(self, id_usuario):
        self.cursor.execute(f"DELETE FROM usuarios WHERE id_usuario = {id_usuario}")
        self.conn.commit()
        return self.cursor.rowcount > 0
    
#=============================================================
# MODIFICAR DATOS DE USUARIO
    def modificar_usuario(self, id_usuario, nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_edad, nueva_fecnac, nueva_imagen_url):
        sql = "UPDATE usuarios SET nombre = %s, apellido = %s, correo = %s, edad = %s, fecnac = %s, imagen_url = %s WHERE id_usuario = %s"
        valores = (nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_edad, nueva_fecnac, nueva_imagen_url, id_usuario)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0
    

#=============================================================
#=============================================================
#PROGRAMA PRINCIPAL

cliente = Cliente(host='localhost', user='root', password='', database='miapp')

ruta_destino = 'static/img/'

@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    usuarios = cliente.listar_usuarios()
    return jsonify(usuarios)

#-------------------------------------------------------------

@app.route("/usuarios/<int:id_usuario>", methods=["GET"])
def mostrar_usuario(id_usuario):
    usuario = cliente.consultar_usuario(id_usuario)
    if usuario:
        return jsonify(usuario)
    else:
        return "Usuario no encontrado", 404
    

#-------------------------------------------------------------

@app.route("/usuarios", methods=["POST"])
def agregar_usuario():
# Toma los datos del form
    id_usuario = request.form['id_usuario']
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    correo = request.form['correo']
    edad = request.form['edad']
    fecnac = request.form['fecnac']
    imagen = request.files['imagen']
    nombre_imagen = secure_filename(imagen.filename)

    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    imagen.save(os.path.join(ruta_destino, nombre_imagen))

    if cliente.agregar_usuario(id_usuario, nombre, apellido, correo, edad, fecnac, nombre_imagen):
        return jsonify({"mensaje": "Usuario agregado"}), 201
    else:
        return jsonify({"mensaje": "Usuario ya existe"}), 400

#-------------------------------------------------------------

@app.route("/usuarios/<int:id_usuario>", methods=["DELETE"])
def borrar_usuario(id_usuario):
    usuario = cliente.mostrar_usuario(id_usuario)
    if usuario:

        ruta_imagen = os.path.join(ruta_destino, usuario['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        if cliente.borrar_usuario(id_usuario):
            return jsonify({"mensaje": "Usuario eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el usuario"}), 500
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

#-------------------------------------------------------------

@app.route("/usuarios/<int:id_usuario>", methods=["PUT"])
def modificar_usuario(id_usuario):

    nuevo_nombre = request.form.get("nombre")
    nuevo_apellido = request.form.get("apellido")
    nuevo_correo = request.form.get("correo")
    nueva_edad = request.form.get("edad")
    nueva_fecnac = request.form.get("fecnac")

    imagen = request.files['imagen']
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    imagen.save(os.path.join(ruta_destino, nombre_imagen))

    if cliente.modificar_usuario(id_usuario, nuevo_nombre,
nuevo_apellido, nuevo_correo, nueva_fecnac, nueva_edad, nombre_imagen):
        return jsonify({"mensaje": "Usuario modificado"}), 200
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404


if __name__ == "__main__":
    app.run(debug=True)
#=============================================================
#=============================================================


