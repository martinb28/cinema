//JS para el HEADER y FOOTER//
let header = `
<a name="arriba"><img id="logo" src="img/logo_transparent_2.png" alt="logo Cinema"></a>
<button class="abrir-menu" id="abrir"><i class="bi bi-list"></i></button>
<nav class="nav" id="nav">
    <button class="cerrar-menu" id="cerrar"><i class="bi bi-x"></i></button>
    <ul>
        <li><a href="index.html">Inicio</a></li>
        <li><a href="proximosestrenos.html">Proximos Estrenos</a></li>
        <li><a href="nuestrassalas.html">Nuestras Salas</a></li>
        <li><a href="contacto.html">Contacto</a></li>
    </ul>            
</nav>
`
document.getElementById("idheader").innerHTML = header

let footer = `
<div class="texto-footer">
<p>/Cinemacines</p>
<p>Shopping Portal Tucumán <br> Yerba Buena - Tucumán - Argentina</p>
</div>
<div class="redes-sociales">
<a href="https://www.facebook.com/" target="_blank"><i id="redes" class="bi bi-facebook"></i></a>
<a href="https://www.instagram.com/" target="_blank"><i id="redes" class="bi bi-instagram"></i></a>
<a href="https://twitter.com/" target="_blank"><i id="redes" class="bi bi-twitter-x"></i></a>
</div>
`
document.getElementById("idfooter").innerHTML = footer

const nav = document.querySelector("#nav")
const abrir = document.querySelector("#abrir")
const cerrar = document.querySelector("#cerrar")

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

//=======================================================//

//API para la sección Equipo de Contacto//
let contenido = document.querySelector('#contenido')

fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json())
    .then(res => {
        console.log(res)

        let contenidoHTML = ''
            
        for (let i = 0; i < res.results.length; i++) {
            contenidoHTML += `
            <div class="equipo">
                <img src="${res.results[i].picture.large}">
                <h4> ${res.results[i].name.first} ${res.results[i].name.last}</h4>
                <a href="mailto:ric.alj@gmail.com" target="_blank">${res.results[i].email}</a></p>
            </div>
            `
        }
            
        contenido.innerHTML = contenidoHTML
    })
    .catch(error => console.log("Ocurrió un error", error))
//================================================================//

//JS para el carrousel de imágenes de próximos estrenos//
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");
const sliderSection = document.querySelectorAll(".slider-section");

setInterval(() => {
    moveToRight();
}, 4000);

let operacion = 0;
let contador = 0;
const widthImg = 100 / sliderSection.length;

btnLeft.addEventListener("click", () => moveToLeft())
btnRight.addEventListener("click", () => moveToRight())

function moveToRight() {
    if (contador >= sliderSection.length - 1) {
        contador = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
    } else {
        contador++;
        operacion = operacion + widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s";
    }
}

function moveToLeft() {
    contador--;
    if (contador < 0) {
        contador = sliderSection.length - 1;
        operacion = widthImg * (sliderSection.length - 1);
        slider.style.transform = `translate(-${operacion}%)`;
    } else {
        operacion = operacion - widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s";
    }
}

//================================================================//