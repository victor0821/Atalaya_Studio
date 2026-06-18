//se encarga de la comunicacion con el servidor
export async function obtenerUsuarios() {
    const URL = 'https://jsonplaceholder.typicode.com/users';

    try {
        // petincion asincrona con fetch
        const respuesta = await fetch(URL);

        // Verificion si la respuesta fue exitosa
        if (!respuesta.ok){
            throw new Error('Error en la conexion de la API')
        }

        // Convertimos a JSON y retomamos los datos puros
        const datos = await respuesta.json();
        return datos;
    }catch (error){
        console.error('Fallo la peticion', error);
    }
}