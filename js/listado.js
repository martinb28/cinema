const URL = "http://127.0.0.1:5000/"

fetch(URL + '/usuarios')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener los usuarios.');
        }
    })
    .then(function (data) {
        let tablaUsuarios = document.getElementById('tablaUsuarios');

        for (let usuario of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + usuario.Nombre + '</td>' +
            '<td>' + usuario.Apellido + '</td>' +
            '<td align="right">' + usuario.Correo + '</td>' +
            '<td align="right">' + usuario.Clave + '</td>' +
            '<td align="right">' + usuario.Dni + '</td>' +
            '<td align="right">' + usuario.Edad + '</td>' +
            '<td align="right">' + usuario.FecNac + '</td>' +
            '<td><img src=./img/' + usuario.Imagen +
            'alt="Imagen del producto" style="width: 100px;"></td>';
            
            
            tablaUsuarios.appendChild(fila);
        }
    })
    .catch(function (error) {
        alert('Error al agregar el usuario.');
        console.error('Error:', error);
    })