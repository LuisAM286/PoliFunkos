let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Captura de elementos del DOM para el modal de login/registro
    const formulario_registro = document.querySelector('.formulario-reg');
    const formulario_login = document.querySelector('.formulario-login');
    const contenedor_logreg = document.querySelector('.cont-logreg');
    const caja_atrasreg = document.querySelector('.atras-reg');
    const caja_atraslog = document.querySelector('.atras-log');


    const testimonios = document.querySelectorAll('.testi');
    const punto = document.querySelectorAll(".puntito");
    let currenIndex = 0;

    const mostrarTestimonio =(index) =>{
        //ocultar testimonios y desctivar puntos

        testimonios.forEach((testimonios, i) => {
            testimonios.classList.toggle('activo', i === index);
            testimonios.classList.toggle('ocul', i === index);
            punto[i].classList.toggle('activo', i === index);
        });
    };

    const sigTestimonio = () => {
        currenIndex = (currenIndex + 1) % testimonios.length;
        mostrarTestimonio(currenIndex);
    };

    mostrarTestimonio(currenIndex);

    setInterval(sigTestimonio, 5000);

    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    rendercart();

    document.getElementById('btn-reg').addEventListener('click', () => {
        registrar(
            formulario_registro,
            formulario_login,
            contenedor_logreg,
            caja_atrasreg,
            caja_atraslog
        );
    });

    document.getElementById('btn-log').addEventListener('click', () => {
        login(
            formulario_registro,
            formulario_login,
            contenedor_logreg,
            caja_atrasreg,
            caja_atraslog
        );
    });

    // Botones de productos
    document.querySelectorAll('.cardprod button').forEach((button) => {
        button.addEventListener('click', () => {
            const prodCard = button.parentElement;
            const prodnom = prodCard.querySelector('h3').textContent;
            const textprec = prodCard.querySelector('.precio').textContent;
            const precio = parseFloat(textprec.replace(/[^0-9.]+/g, ''));

            agCarrito(prodnom, precio);
        });
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal(formulario_registro, formulario_login, contenedor_logreg, caja_atrasreg, caja_atraslog);
        }
    });
});

// Funciones del modal
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

function closeModal(formulario_registro, formulario_login, contenedor_logreg, caja_atrasreg, caja_atraslog) {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // Restaurar estado inicial del modal
    formulario_registro.style.display = 'none';
    contenedor_logreg.style.left = '0px';
    formulario_login.style.display = 'block';
    caja_atrasreg.style.opacity = '1';
    caja_atraslog.style.opacity = '0';
}

function registrar(formulario_registro, formulario_login, contenedor_logreg, caja_atrasreg, caja_atraslog) {
    formulario_registro.style.display = 'block';
    contenedor_logreg.style.left = '630px';
    formulario_login.style.display = 'none';
    caja_atrasreg.style.opacity = '0';
    caja_atraslog.style.opacity = '1';
}

function login(formulario_registro, formulario_login, contenedor_logreg, caja_atrasreg, caja_atraslog) {
    formulario_login.style.display = 'block';
    contenedor_logreg.style.left = '0px';
    formulario_registro.style.display = 'none';
    caja_atraslog.style.opacity = '0';
    caja_atrasreg.style.opacity = '1';
}

// Funciones del carrito
function toggleCart() {
    const cartElement = document.getElementById('carrito');
    cartElement.classList.toggle('hidden');
}

function agCarrito(prodnom, precio) {
    cart.push({ prodnom, precio });
    localStorage.setItem('carrito', JSON.stringify(cart)); // Guardar carrito en localStorage
    rendercart();
}

function rendercart() {
    const cartItems = document.getElementById('carro-prod');
    const cartTotal = document.getElementById('carr-total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement('li');
        li.innerHTML = `${item.prodnom} - $${item.precio.toFixed(2)} <button onclick="removeFromcart(${index})">Eliminar</button>`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = `$${total.toFixed(2)} mxn`;
}

function removeFromcart(index) {
    cart.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(cart)); // Actualizar carrito en localStorage
    rendercart();
}

function limpCart() {
    cart = [];
    localStorage.removeItem('carrito'); // Vaciar carrito en localStorage
    rendercart();
}
