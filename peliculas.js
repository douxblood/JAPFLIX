// Arreglos para almacenar las películas
let listaPeliculas = [];
let peliculasFiltradas = [];

// Función para renderizar las películas en el DOM
function renderizarPeliculas(peliculas) {
    document.getElementById("lista").innerHTML = ""; // Limpia la lista previa

    for (const film of peliculas) { // Recorre el array de películas
        let estrellas = ""; // Almacena la calificación en estrellas

        // Genera las estrellas según la calificación promedio (escala de 5 estrellas)
        for (let i = 0; i < Math.floor(film.vote_average / 2); i++) {
            estrellas += `<span class="fa fa-star checked"></span>`; // Estrella llena
        }
        for (let i = 0; i < (5 - Math.floor(film.vote_average / 2)); i++) {
            estrellas += `<span class="fa fa-star"></span>`; // Estrella vacía
        }

        let generos = ""; // Almacena los géneros concatenados
        for (const categoria of film.genres) {
            generos += categoria.name + " - ";
        }
        generos = generos.slice(0, -3); // Elimina el último " - "

        // Añade cada película al HTML
        document.getElementById("lista").innerHTML += `
            <li class="list-group-item bg-dark text-white"> 
                <div type="button" data-bs-toggle="offcanvas" data-bs-target="#oc${film.id}" aria-controls="offcanvasTop">
                    <div class="fw-bold">${film.title} <span class="float-end">${estrellas}</span></div> 
                    <div class="text-muted fst-italic">${film.tagline}</div> 
                </div>
                <div class="offcanvas offcanvas-top text-dark" tabindex="-1" id="oc${film.id}" aria-labelledby="offcanvasTopLabel">
                    <div class="offcanvas-header">
                        <h3 class="offcanvas-title" id="offcanvasTopLabel">${film.title}</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> 
                    </div>
                    <div class="offcanvas-body">
                        <p>${film.overview}</p> 
                        <hr>
                        <span class="text-muted">
                            ${generos}
                            <button class="float-end btn btn-secondary dropdown-toggle" type="button" id="dd${film.id}" data-bs-toggle="dropdown" aria-expanded="false">More</button>
                            <ul class="dropdown-menu" aria-labelledby="dd${film.id}">
                                <li><span class="dropdown-item">Year: <span class="float-end ps-1"> ${film.release_date.slice(0,4)}</span></span></li>
                                <li><span class="dropdown-item">Runtime: <span class="float-end ps-1"> ${film.runtime} mins</span></span></li>
                                <li><span class="dropdown-item">Budget: <span class="float-end ps-1"> $${film.budget}</span></span></li>
                                <li><span class="dropdown-item">Revenue: <span class="float-end ps-1"> $${film.revenue}</span></span></li>
                            </ul>
                        </span>
                    </div>
                </div>
            </li>
        `;
    }
}

// Evento cuando se carga el DOM
document.addEventListener("DOMContentLoaded", function () {
    
    const urlData = 'https://japceibal.github.io/japflix_api/movies-data.json';

    // Petición para obtener datos de las películas
    fetch(urlData)
        .then(respuesta => respuesta.json())
        .then(datos => {
            listaPeliculas = datos; // Asigna las películas obtenidas
            
            // Acción del botón de búsqueda
            document.getElementById("btnBuscar").addEventListener("click", function () {
                peliculasFiltradas = []; // Reinicia el array de resultados
                let query = document.getElementById("inputBuscar").value; // Obtiene la consulta
                if (query) {
                    peliculasFiltradas = listaPeliculas.filter(film => {
                        // Filtra por título, subtítulo o descripción
                        return film.title.toLowerCase().includes(query.toLowerCase()) ||
                               film.tagline.toLowerCase().includes(query.toLowerCase()) ||
                               film.overview.toLowerCase().includes(query.toLowerCase());
                    });
                }
                renderizarPeliculas(peliculasFiltradas); // Muestra las películas filtradas
            });
        });
});
