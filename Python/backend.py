from flask import Flask, request, jsonify
from flask import request
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)
CORS(app)


class Listado_usuarios:

    def __init__(self, host, user, password, database):

        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
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

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS `Clientes` (                                
                                `Nombre` varchar(30) NOT NULL,
                                `Apellido` varchar(30) NOT NULL,
                                `Correo` varchar(50) NOT NULL,
                                `Clave` varchar(11) NOT NULL,
                                `Dni` int(8) NOT NULL,                               
                                `Edad` int(11) NOT NULL,
                                `FecNac` date NOT NULL,                                
                                `Imagen` varchar(255) NOT NULL
                                )''')
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def agregar_usuario(self, nombre, apellido, correo, clave, dni, edad, fecnac, imagen):
        self.cursor.execute(f"SELECT * FROM Clientes WHERE Dni = {dni}")
        usuario_existe = self.cursor.fetchone()
        if usuario_existe:
            return False

        nombre_imagen = secure_filename(imagen.filename) 

        ruta_imagen = os.path.join(ruta_destino, f"{nombre_imagen}_{int(time.time())}")
        imagen.save(ruta_imagen)

        sql = "INSERT INTO Clientes (Nombre, Apellido, Correo, Clave, Dni, Edad, fecNac, imagen) Values (%s, %s, %s, %s, %s, %s, %s, %s)"
        valores = (nombre, apellido, correo, clave, dni, edad, fecnac, ruta_imagen)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True


    def consultar_usuario(self, dni):
        self.cursor.execute(f"SELECT * FROM Clientes where Dni = {dni}")
        return self.cursor.fetchone()
    
    def modificar_usuario(self, dni, nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_clave, nueva_edad, nueva_fecnac, nueva_imagen):
        sql = "UPDATE Clientes SET Nombre = %s, Apellido = %s, Correo = %s, Clave = %s, Edad = %s, FecNac = %s, Imagen = %s WHERE Dni = %s"
        valores = (nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_clave, nueva_edad, nueva_fecnac, nueva_imagen, dni)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    # def modificar_usuario(self, nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_clave, dni, nueva_edad,
    #                       nueva_fecnac, nueva_imagen):
    #     sql = f"UPDATE Clientes SET Nombre = '{nuevo_nombre}', Apellido = '{nuevo_apellido}', Correo = '{nuevo_correo}', Clave = '{nueva_clave}', Edad = '{nueva_edad}',FecNac =  '{nueva_fecnac}', Imagen = '{nueva_imagen}' WHERE Dni = {dni}"
    #     self.cursor.execute(sql)
    #     self.conn.commit()
    #     return self.cursor.rowcount > 0

    # def mostrar_usuario(self, dni):
    #     usuario = self.consultar_usuario(dni)
    #     if usuario:
    #         print("-" * 50)
    #         print(f"nombre.....: {usuario['Nombre']}")
    #         print(f"apellido: {usuario['Apellido']}")
    #         print(f"correo...: {usuario['Correo']}")
    #         print(f"clave.....: {usuario['Clave']}")
    #         print(f"DNI.....: {usuario['Dni']}")
    #         print(f"edad.....: {usuario['Edad']}")
    #         print(f"fecha de nacimiento..: {usuario['FecNac']}")
    #         print(f"imagen..: {usuario['Imagen']}")
    #         print("-" * 50)

    def listar_usuarios(self):
        self.cursor.execute("SELECT * FROM Clientes")
        clientes = self.cursor.fetchall()
        return clientes

    def eliminar_usuario(self, dni):
        self.cursor.execute(f"DELETE FROM Clientes where Dni = {dni}")
        self.conn.commit()
        return self.cursor.rowcount > 0


clientes = Listado_usuarios(host='localhost', user='root', password='', database='Cinema')

ruta_destino = './img'

@app.route("/usuarios", methods=["POST"])
def agregar_usuario_route():
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    correo = request.form['correo']
    clave = request.form['clave']
    dni = request.form['dni']
    edad = request.form['edad']
    fecnac = request.form['fecnac']
    imagen = request.files['imagen']
    nombre_imagen = secure_filename(imagen.filename)

    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    imagen.save(os.path.join(ruta_destino, nombre_imagen))

    if clientes.agregar_usuario(nombre, apellido, correo, clave, dni, edad, fecnac, imagen):
        return jsonify({"mensaje": "Usuario agregado"}), 201
    else:
        return jsonify({"mensaje": "Usuario ya existente"}), 400

@app.route("/usuarios", methods=["GET"])
def listar_usuarios_route():
    usuarios = clientes.listar_usuarios()
    return jsonify(usuarios)

# @app.route("/modificar_usuario/<int:dni>", methods=["PUT"])
# def modificar_producto_route(dni):
#     nuevo_nombre = request.form.get("nombre")
#     nuevo_apellido = request.form.get("apellido")
#     nuevo_correo = request.form.get("correo")
#     nueva_clave = request.form.get("clave")
#     nueva_edad = request.form.get("edad")
#     nueva_fecnac = request.form.get("fecnac")

#     imagen = request.files['imagen']
#     nombre_imagen = secure_filename(imagen.filename)
#     nombre_base, extension = os.path.splitext(nombre_imagen)
#     nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
#     imagen.save(os.path.join(ruta_destino, nombre_imagen))
    
#     if clientes.modificar_usuario(dni, nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_clave, nueva_edad, nueva_fecnac, nombre_imagen,):
#         return jsonify({"mensaje": "Usuario modificado"}), 200
#     else:
#         return jsonify({"mensaje": "Usuario no encontrado"}), 404

@app.route("/usuarios/<int:Dni>", methods=["DELETE"])
def eliminar_usuario_route(Dni):
    if clientes.eliminar_usuario(Dni):
        return jsonify({"mensaje": "usuario eliminado"}), 200
    else:
        return jsonify({"mensaje": "Error al eliminar el usuario"}),500    

if __name__ == "__main__":
    app.run(debug=True)