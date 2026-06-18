//Moduilo principal

import {obtenerUsuarios} from './api.js';
import {validarFormulario, crearCardTestimonio} from './ui.js';
import { cargarTema, alternarTema } from './themes.js';

cargarTema();

//selecccion de elementos globales
const contenedorTestimonios = document.getElementById('contenedor-testimonio');
const formulario = document.querySelector('form');

//carga inicial de la pagina
document.addEventListener('DOMContentLoaded', async () => {

    //1. llamamos a la API (api.js)
    const usuarios = await obtenerUsuarios();

    //2. si hay datos, los pintamos (ui.js)
    if (usuarios.length > 0) {
        usuarios.slice(0, 3).forEach(u => {
        contenedorTestimonios.appendChild(crearCardTestimonio(u));
    });
    }
})

// cargar preferencia guardada en LocalStorage
// Actualizar ícono del botón según el tema actual
const btnTema = document.getElementById('btn-tema');
if (btnTema) {
    const actualizar = () => {
        const tema = document.documentElement.getAttribute('data-bs-theme');
        btnTema.textContent = tema === 'dark' ? '☀️' : '🌙';
    };
    actualizar(); // estado inicial
    btnTema.addEventListener('click', () => {
        alternarTema();  // cambia data-bs-theme + guarda en LocalStorage
        actualizar();    // actualiza el ícono
    });
}

// Formulario de contacto 
const formularioContacto = document.getElementById('formulario-contacto');
if (formularioContacto) {
    formularioContacto.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nombre  = document.getElementById('nombre').value.trim();
        const email   = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !email || !mensaje) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            // Cuando el servidor esté listo, enviará aquí
            const respuesta = await fetch('http://localhost:3000/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, mensaje })
            });

            if (respuesta.ok) {
                const alerta = document.getElementById('alerta-contacto');
                alerta.classList.remove('d-none');
                formularioContacto.reset();
                setTimeout(() => alerta.classList.add('d-none'), 4000);
            } else {
                alert('Hubo un problema al enviar. Intenta de nuevo.');
            }
        } catch {
            alert('Servidor no disponible aún. Configúralo con Node.js primero.');
        }
    });
}


