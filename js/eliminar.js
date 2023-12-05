const URL = "https://martinb28.pythonanywhere.com/"

const app = Vue.createApp({
    data() {
        return {
            usuarios: []
        }
    },
    methods: {
        obtenerUsuarios() {
            fetch(URL + 'usuarios')
            .then(response => {
                if (response.ok) { 
                    return response.json();
                 } else {
                    throw new Error('Error al obtener los usuarios');
                }
            })            
            .then(data => {
                this.usuarios = data;
                
                this.$forceUpdate();
            })
            .catch(error => {
                console.log('Error:', error);
                alert('Error al obtener los usuarios.');
            });
            
        },
        eliminarUsuario(dni) {
            console.log(dni)
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                fetch(URL + `usuarios/${dni}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        this.usuarios =this.usuarios.filter(usuario => usuario.Dni !== dni);
                        console.log(this.usuarios)
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