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
            fila.innerHTML = '<td>' + usuario.nombre + '</td>' +
            '<td>' + usuario.apellido + '</td>' +
            '<td align="right">' + usuario.correo + '</td>' +
            '<td align="right">' + usuario.clave + '</td>' +
            '<td align="right">' + usuario.dni + '</td>' +
            '<td align="right">' + usuario.edad + '</td>' +
            '<td align="right">' + usuario.fecnac + '</td>';
            
            
            tablaUsuarios.appendChild(fila);
        }
    })
    .catch(function (error) {
        alert('Error al agregar el usuario.');
        console.error('Error:', error);
    })