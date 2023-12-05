const URL = "https://martinb28.pythonanywhere.com/"

document.getElementById('formulario').addEventListener('submit',function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('apellido', document.getElementById('apellido').value);
    formData.append('correo', document.getElementById('correo').value);
    formData.append('clave', document.getElementById('clave').value);
    formData.append('dni', document.getElementById('dni').value);
    formData.append('edad', document.getElementById('edad').value);
    formData.append('fecnac', document.getElementById('fecnac').value);


    fetch(URL + 'usuarios', {
        method: 'POST',
        body: formData
    })

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al registrar usuario');
        }
    })

    .then(function () {
        alert('Usuario registrado correctamente');
    })
    .catch(function(error){
        alert('Error al registrar el usuario catch');
        console.error('Error: ',error);
    })
    .finally(function () {
        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value = "";
        document.getElementById('correo').value = "";
        document.getElementById('clave').value = "";
        document.getElementById('dni').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('fecnac').value = "";

    });
})