const URL = "http://127.0.0.1:5000/"
// Realizamos la solicitud GET al servidor para obtener todos los productos
fetch(URL + 'usuarios')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al obtener los usuarios.');
        }
    })
    .then(function (data) {
        let tablaUsuarios = document.getElementById('tablaUsuarios');
        // Iteramos sobre los productos y agregamos filas a la tabla
        for (let usuario of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + usuario.id_usuario + '</td>' +
                '<td>' + usuario.nombre + '</td>' +
                '<td align="right">' + usuario.apellido + '</td>' +
                '<td align="right">' + usuario.edad + '</td>' +
                // Mostrar miniatura de la imagen
                '<td><img src=static/img/' + usuario.imagen_url + 'alt = "Foto del usuario" style = "width: 100px;" ></td > ' +
            '<td align="right">' + usuario.fecnac + '</td>';
            //Una vez que se crea la fila con el contenido del producto, se agrega a la tabla utilizando el método appendChild del elemento
            tablaUsuarios.
                tablaUsuarios.appendChild(fila);
        }
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al agregar el usuario.');
        console.error('Error:', error);
    })
