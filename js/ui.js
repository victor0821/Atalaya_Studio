
//funcion para valida formulario
export function validarFormulario(evento) {
    evento.preventDefault(); //detenemos recarga

    // Seleccion de inputs dentro del formulario que disparó
    const formulario = evento.target;
    const nombre = formulario.querySelector('#nombre').value;
    const email = formulario.querySelector('#email').value;

    // validacion campos vacios
    if (!nombre|| !email) {
        alert('Error: porfavor completa todos los campos');
        return;
    }

    // Validacion: formato de correo simple (incluye @)
    if (!email.includes('@')) {
        alert('Error: Ingresa un correo valido');
    }
}

// funcion para tarjeta de testimonio con clases Bootstrap
export function crearCardTestimonio(usuario) {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <h3 class="h6 fw-bold mb-1">${usuario.name}</h3>
                <span class="badge bg-primary-subtle text-primary mb-2">
                    ${usuario.company.name}
                </span>
                <p class="text-body-secondary small mb-2">${usuario.email}</p>
                <hr>
                <p class="fst-italic small mb-0">
                    "Excelente trabajo, superaron nuestras expectativas."
                </p>
            </div>
        </div>
    `;
    return col;
}