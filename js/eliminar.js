const URL = "http://127.0.0.1:5000/"

const app = Vue.createApp({
    data() {
        return {
            usuarios: []
        }
    },
    methods: {
        obtenerUsuarios() {
            fetch(URL + '/eliminar_usuarios')
            .then(response => {
                if (response.ok) { return response.json(); }
            })
            .then(data => {
                this.usuarios = data;
            })
            .catch(error => {
                console.log('Error:', error);
                alert('Error al obtener los usuarios.');
            });
        },
        eliminarUsuario(dni) {
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                fetch(URL + `/eliminar_usuarios/${dni}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        this.usuario =
                        this.usuario.filter(usuario => usuario.dni !== dni);
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
        this.obtenerProductos();
    }
});
app.mount('body');