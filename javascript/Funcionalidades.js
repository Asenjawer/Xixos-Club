// Card flip //
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});


let indiceActual = 0; // Índice de la imagen actual
let intervaloAutoplay; // Variable para el intervalo de autoplay

// Función para mover el carrusel
function moverCarrusel(direccion) {
    const carruselInner = document.querySelector('.carrusel-inner');
    const totalItems = document.querySelectorAll('.carrusel-item').length;

    // Calcula el nuevo índice
    indiceActual += direccion;

    // Vuelve al principio si llega al final
    if (indiceActual >= totalItems) {
        indiceActual = 0;
    }

    // Vuelve al final si llega al principio
    if (indiceActual < 0) {
        indiceActual = totalItems - 1;
    }

    // Mueve el carrusel
    const offset = -indiceActual * 100;
    carruselInner.style.transform = `translateX(${offset}%)`;

    // Actualiza los indicadores
    actualizarIndicadores();
}

// Función para actualizar los indicadores
function actualizarIndicadores() {
    const puntos = document.querySelectorAll('.indicadores .punto');
    puntos.forEach((punto, index) => {
        if (index === indiceActual) {
            punto.classList.add('activo');
        } else {
            punto.classList.remove('activo');
        }
    });
}

// Función para iniciar el autoplay
function iniciarAutoplay() {
    intervaloAutoplay = setInterval(() => {
        moverCarrusel(1);
    }, 3000); // Cambia de imagen cada 3 segundos
}

// Función para detener el autoplay
function detenerAutoplay() {
    clearInterval(intervaloAutoplay);
}

// Generar los indicadores dinámicamente
function generarIndicadores() {
    const indicadores = document.querySelector('.indicadores');
    const totalItems = document.querySelectorAll('.carrusel-item').length;

    for (let i = 0; i < totalItems; i++) {
        const punto = document.createElement('div');
        punto.classList.add('punto');
        punto.addEventListener('click', () => {
            indiceActual = i;
            moverCarrusel(0);
        });
        indicadores.appendChild(punto);
    }

    // Marcar el primer punto como activo
    actualizarIndicadores();
}

// Iniciar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    generarIndicadores();
    iniciarAutoplay();

    // Detener autoplay al interactuar con los controles
    const controles = document.querySelectorAll('.carrusel-control');
    controles.forEach(control => {
        control.addEventListener('click', detenerAutoplay);
    });
});