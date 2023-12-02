const URL = "http://127.0.0.1:5000/"

const app = Vue.createApp({
    data() {
        return {
            nombre: '',
            apellido: '',
            correo: '',
            clave: '',
            dni: '',
            edad: '',
            fecnac: '',
            mostrarDatosUsuario: false,
        };
    },
    methods: {
        obtenerUsuario() {
            fetch(`${URL}usuarios/${this.dni}`, {method: 'GET'})
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error al obtener los datos del usuario.');
                }
            })
            .then(data => {
                this.nombre = data.nombre;
                this.apellido = data.apellido;
                this.correo = data.correo;
                this.clave = data.clave;
                this.dni = data.dni;
                this.edad = data.edad;
                this.fecnac = data.fecnac;
                this.mostrarDatosUsuario = true;
            })
            .catch(error => {
                console.log(error);
                alert('DNI no encontrado.');
            })
        },
        guardarCambios() {
            const formData = new FormData();
            formData.append('nombre', this.nombre);
            formData.append('apellido', this.apellido);
            formData.append('correo', this.correo);
            formData.append('clave', this.clave);                
            formData.append('edad', this.edad);
            formData.append('fecnac', this.fecnac);            

            fetch(`${URL}usuarios/${this.dni}`, {
                method: 'PUT',
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error al guardar los cambios del usuario.')
                }
            })
            .then(data => {
                alert('Usuario actualizado correctamente.');
                this.limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el usuario.');
            });
        },
        limpiarFormulario() {
            this.nombre = '';
            this.apellido = '';
            this.correo = '';
            this.clave = '';
            this.dni = '';
            this.edad = '';
            this.fecnac = '';
            this.mostrarDatosUsuario = false;
        }
    }
});
app.mount('#app');