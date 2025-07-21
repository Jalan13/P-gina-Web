// Base de datos de vehículos
const vehiculos = [
    {
        id: 1,
        titulo: "Toyota Highlander 2015",
        imagen: "img/Highlander.jpg",
        precio: 45,
        marca: "toyota",
        caracteristicas: ["Automático", "A/C", "5 Asientos", "GPS"],
        rating: 4.8,
        popular: true,
        combustible: "Gasolina",
        año: 2024
    },
    {
        id: 2,
        titulo: "Toyota RAV4 2024",
        imagen: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=400",
        precio: 65,
        marca: "toyota",
        caracteristicas: ["SUV", "AWD", "5 Asientos", "Cámara"],
        rating: 4.9,
        popular: true,
        combustible: "Híbrido",
        año: 2024
    },
    {
        id: 3,
        titulo: "Toyota Camry 2024",
        imagen: "https://images.pexels.com/photos/2479557/pexels-photo-2479557.jpeg?auto=compress&cs=tinysrgb&w=400",
        precio: 55,
        marca: "toyota",
        caracteristicas: ["Sedán", "Premium", "5 Asientos", "Bluetooth"],
        rating: 4.7,
        popular: false,
        combustible: "Gasolina",
        año: 2024
    },
    {
        id: 4,
        titulo: "Toyota Highlander 2024",
        imagen: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=400",
        precio: 80,
        marca: "toyota",
        caracteristicas: ["SUV", "8 Asientos", "AWD", "Premium"],
        rating: 4.9,
        popular: false,
        combustible: "Híbrido",
        año: 2024
    },
    {
        id: 5,
        titulo: "Honda CR-V 2020",
        imagen: "img/CRV Gris 2020.jpg",
        precio: 50,
        marca: "honda",
        caracteristicas: ["Automático", "GPS", "5 Asientos", "USB"],
        rating: 4.8,
        popular: true,
        combustible: "Gasolina",
        año: 2024
    },
    {
        id: 6,
        titulo: "Honda CR-V 2020",
        imagen: "img/CRV Gris Nardo 2020.jpg",
        precio: 70,
        marca: "honda",
        caracteristicas: ["SUV", "AWD", "7 Asientos", "Cámara"],
        rating: 4.9,
        popular: true,
        combustible: "Gasolina",
        año: 2024
    },
    {
        id: 7,
        titulo: "Honda CR-V 2010",
        imagen: "img/CRV Gris 2010.jpg",
        precio: 60,
        marca: "honda",
        caracteristicas: ["Sedán", "Premium", "5 Asientos", "Sunroof"],
        rating: 4.8,
        popular: false,
        combustible: "Gasolina",
        año: 2024
    },
    {
        id: 8,
        titulo: "Honda CR-V 2013",
        imagen: "img/CRV Blanca 2013.jpg",
        precio: 75,
        marca: "honda",
        caracteristicas: ["SUV", "8 Asientos", "AWD", "Navegación"],
        rating: 4.7,
        popular: false,
        combustible: "Gasolina",
        año: 2024
    },
    {
        id: 9,
        titulo: "Hyundai Santa Fe 2015",
        imagen: "img/Santa Fe.jpg",
        precio: 75,
        marca: "hyundai",
        caracteristicas: ["SUV", "5 Asientos", "AWD", "Navegación"],
        rating: 4.7,
        popular: false,
        combustible: "Gasolina",
        año: 2015
    }
];

// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let seccionActual = "inicio";

// Elementos del DOM
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');
const aside = document.querySelector('aside');
const botonesCategoria = document.querySelectorAll('.boton-categoria');
const numerito = document.getElementById('numerito');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    inicializarApp();
});

openMenu?.addEventListener('click', () => {
    aside.classList.add('aside-visible');
});

closeMenu?.addEventListener('click', () => {
    aside.classList.remove('aside-visible');
});

// Funciones principales
function inicializarApp() {
    actualizarNumerito();
    cargarVehiculos();
    
    // Event listeners para botones de categoría
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const categoria = e.currentTarget.id;
            cambiarSeccion(categoria);
        });
    });
}

function cambiarSeccion(nuevaSeccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const seccionElemento = document.getElementById(`seccion-${nuevaSeccion}`);
    if (seccionElemento) {
        seccionElemento.classList.add('active');
    }
    
    // Actualizar botones activos
    botonesCategoria.forEach(boton => {
        boton.classList.remove('active');
    });
    
    const botonActivo = document.getElementById(nuevaSeccion);
    if (botonActivo) {
        botonActivo.classList.add('active');
    }
    
    // Cerrar menú móvil
    aside.classList.remove('aside-visible');
    
    // Cargar vehículos según la sección
    if (nuevaSeccion !== 'inicio') {
        cargarVehiculos(nuevaSeccion);
    }
    
    seccionActual = nuevaSeccion;
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cargarVehiculos(categoria = 'vehiculos') {
    let vehiculosFiltrados;
    let contenedor;
    
    switch (categoria) {
        case 'toyota':
            vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo.marca === 'toyota');
            contenedor = document.getElementById('contenedor-toyota');
            break;
        case 'honda':
            vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo.marca === 'honda');
            contenedor = document.getElementById('contenedor-honda');
            break;
       case 'hyundai':
    vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo.marca.toLowerCase() === 'hyundai');
    contenedor = document.getElementById('contenedor-hyundai');
    break;
        default:
            vehiculosFiltrados = vehiculos;
            contenedor = document.getElementById('contenedor-productos');
    }
    
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    vehiculosFiltrados.forEach((vehiculo, index) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.style.animationDelay = `${index * 0.1}s`;
        
        div.innerHTML = `
            ${vehiculo.popular ? '<div class="badge-popular">Popular</div>' : ''}
            <img class="producto-imagen" src="${vehiculo.imagen}" alt="${vehiculo.titulo}">
            <div class="producto-detalles">
                <div class="producto-rating">
                    <span class="rating-stars">★</span>
                    <span class="rating-number">${vehiculo.rating}</span>
                </div>
                <h3 class="producto-titulo">${vehiculo.titulo}</h3>
                <p class="producto-precio">$${vehiculo.precio}/día</p>
                <div class="producto-caracteristicas">
                    ${vehiculo.caracteristicas.map(caracteristica => 
                        `<span class="caracteristica">${caracteristica}</span>`
                    ).join('')}
                </div>
                <button class="producto-agregar" id="${vehiculo.id}">Rentar Ahora</button>
            </div>
        `;
        
        contenedor.appendChild(div);
    });
    
    // Agregar event listeners a los botones de agregar
    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll('.producto-agregar');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    // Siempre leer del localStorage primero
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const vehiculoAgregado = vehiculos.find(vehiculo => vehiculo.id == idBoton);

    if (carrito.some(vehiculo => vehiculo.id == idBoton)) {
        carrito.find(vehiculo => vehiculo.id == idBoton).cantidad++;
    } else {
        const vehiculoParaCarrito = {...vehiculoAgregado}; // Crear copia
        vehiculoParaCarrito.cantidad = 1;
        vehiculoParaCarrito.dias = 1;
        carrito.push(vehiculoParaCarrito);
    }

    // Actualizar localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizar UI
    actualizarNumerito();
    mostrarNotificacion(`${vehiculoAgregado.titulo} agregado al carrito`);
}


function actualizarNumerito() {
    let nuevoNumerito = carrito.reduce((acc, vehiculo) => acc + vehiculo.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

function mostrarNotificacion(mensaje) {
    if (typeof Toastify !== 'undefined') {
        Toastify({
            text: mensaje,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(135deg, #dc2626, #991b1b)",
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif"
            }
        }).showToast();
    }
}

// Función global para el botón del hero
window.cambiarSeccion = cambiarSeccion;

// Animaciones de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.value-card, .contact-item, .producto');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});