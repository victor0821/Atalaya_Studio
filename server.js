// Servidor Express — Atalaya Studio 
const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app     = express();
const PUERTO  = 3000;
const RUTA_CONTACTOS = path.join(__dirname, 'contactos.json');

// Middlewares 
app.use(cors());                    // permite peticiones desde el frontend
app.use(express.json());            // parsea el body como JSON
app.use(express.static(__dirname)); // sirve index.html y los JS

// Helpers 

// Lee el archivo contactos.json y devuelve el arreglo
function leerContactos() {
    try {
        const contenido = fs.readFileSync(RUTA_CONTACTOS, 'utf-8');
        // Si el archivo está vacío, devuelve arreglo vacío
        return contenido.trim() ? JSON.parse(contenido) : [];
    } catch {
        return []; // si no existe o falla, empieza vacío
    }
}

// Guarda el arreglo en contactos.json con formato legible
function guardarContactos(contactos) {
    fs.writeFileSync(RUTA_CONTACTOS, JSON.stringify(contactos, null, 2), 'utf-8');
}

// Rutas 

// POST /api/contacto — recibe el formulario y guarda
app.post('/api/contacto', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Validación básica en el servidor
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios: nombre, email y mensaje.'
        });
    }

    // Construimos el nuevo contacto con fecha
    const nuevoContacto = {
        id: Date.now(),
        nombre,
        email,
        mensaje,
        fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
    };

    // Leemos, añadimos y guardamos
    const contactos = leerContactos();
    contactos.push(nuevoContacto);
    guardarContactos(contactos);

    console.log('📩 Nuevo mensaje recibido:', nuevoContacto);

    return res.status(200).json({
        ok: true,
        mensaje: '¡Mensaje guardado correctamente!'
    });
});

// GET /api/contactos — lista todos los mensajes guardados
app.get('/api/contactos', (req, res) => {
    const contactos = leerContactos();
    res.json(contactos);
});

//  Inicio del servidor 
app.listen(PUERTO, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
    console.log(`📂 Mensajes se guardan en: ${RUTA_CONTACTOS}`);
});