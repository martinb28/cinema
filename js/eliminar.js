const URL = "http://127.0.0.1:5000/"

const app = Vue.createApp({
    data() {
        return {
            usuarios: []
        }
    },
    methods: {
        obtenerUsuarios() {
            fetch(URL + '/listar_usuarios')
            .then(response => {
                if (response.ok) { 
                    return response.json();
                 } else {
                    throw new Error('Error al obtener los usuarios');
                }
            })
            .then(data => {
                this.usuarios = data;
                console.log(this.usuarios)
                this.$forceUpdate();
            })
            .catch(error => {
                console.log('Error:', error);
                alert('Error al obtener los usuarios.');
            });
            
        },
        eliminarUsuario(dni) {
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                fetch(URL + `/listar_usuarios/${dni}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        this.usuarios =this.usuarios.filter(usuario => usuario.dni !== dni);
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
        this.obtenerUsuarios();
    }
});
app.mount('body');