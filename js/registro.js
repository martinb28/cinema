function validarFormulario() {
    // Obtener los valores ingresados por el usuario
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let edad = document.getElementById("edad").value;
    
    // Validar que los campos de nombre y apellido no estén vacíos
    if (nombre === "" || apellido === "") {
        alert("Por favor, ingrese su nombre y apellido.");
        return false; 
    }
    
    // Validar que el campo de correo tenga un formato valido
    let correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!correo.match(correoRegex)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida.");
        return false; 
    }
    
    // Validar la edad
    if (edad !== "" || edad !== 0) {
        if (edad < 18 || edad > 99) {
            alert("La edad debe estar entre 18 y 99 años.");
            return false; 
        }
    }
    
    // en caso de estar todo ok, la info se envia
    return true;
}


function validarFormulario_contacto() {
    // Obtener los valores ingresados por el usuario
    let nombre = document.getElementById("nombre_contacto").value;
    let apellido = document.getElementById("apellido_contacto").value;
    let correo = document.getElementById("correo_contacto").value;
    let comentarios = document.getElementById("comentarios_contacto").value;
    
    // Validar que los campos de nombre, apellido, correo y comentarios no esten vacios
    if (nombre === "" || apellido === "" || correo === "" || comentarios === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }
    
    // Validar el formato del correo electrónico
    let correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!correo.match(correoRegex)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida.");
        return false;
    }
    
    // en caso de estar todo ok, el mail se envia
    return true;
}