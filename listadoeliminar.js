const URL = "http://127.0.0.1:5000/"
const app = Vue.createApp({
    data() {
        return {
            usuarios:[]
        }
    },
    methods: {
        obtenerUsuarios() {
            // Obtenemos el contenido del inventario
            fetch(URL + 'usuarios')
                .then(response => {
                    // Parseamos la respuesta JSON
                    if (response.ok) { return response.json(); }
                })
                .then(data => {
                    // El código Vue itera este elemento para generar la tabla
                    this.usuarios = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener los usuarios.');
                });
        },
        borrarUsuario(id_usuario) {
            if (confirm('¿Estás seguro de que quieres eliminar este usuario ? ')) {
                fetch(URL + `usuarios/${id_usuario}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            this.usuarios =
                                this.usuarios.filter(usuario => usuario.id_usuario !== usuario);
                            alert('usuario eliminado correctamente.');
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        }
    },
    mounted() {
        //Al cargar la página, obtenemos la lista de usuarios
        this.obtenerUsuarios();
    }
});
app.mount('body');