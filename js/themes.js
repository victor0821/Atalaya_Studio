// modulo de tema: maneja el modo oscuro y la persistencia (LocalStorage)

const TEMA_KEY = 'atalaya_tema';

// recuperar la memoria del usuario
export function cargarTema(){
    //consultar Local Storage (memoria a largo plazo)
    const temaGuardado = localStorage.getItem(TEMA_KEY);

    if (temaGuardado){
        //aplicamos el tema guardadop en el HTML
        document.documentElement.setAttribute('data-bs-theme', temaGuardado);

    }

}

// Microinteracciones de cambio de tema

export function alternarTema(){
    const html = document.documentElement;
    const temaActual = html.getAttribute('data-bs-theme') || 'light';

    //invertimos el tema
    const nuevoTema = temaActual === 'light' ? 'dark' : 'light';

    //manejo de colores de bootstrap
    html.setAttribute('data-bs-theme', nuevoTema);

    //guardamos la preferencia para el futuro
    localStorage.setItem(TEMA_KEY, nuevoTema);
}