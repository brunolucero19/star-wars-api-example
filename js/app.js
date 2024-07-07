document.addEventListener('DOMContentLoaded',() =>{
    const searchBar = document.querySelector('#search-bar')
    const containercard = document.querySelector('#container-card')
    const charactersbutton = document.querySelector('#characters-button')
    const starshipsbutton = document.querySelector('#starships-button')
    const filmsbutton = document.querySelector('#films-button')

    searchBar.addEventListener('input', async (e) => {
        const busqueda = e.target.value.toLowerCase()
        if (busqueda){
            const characters = await obtenerDatos ('people',busqueda)
            const starships = await obtenerDatos ('starships',busqueda)
            const films = await obtenerDatos ('films',busqueda)

            mostrarResultados([...characters, ...starships, ...films])

        } else {
            containercard.innerHTML=''
        }

    })

    async function obtenerDatos(categoria,busqueda) {
        const response = await fetch(`https://swapi.dev/api/${categoria}/?search=${busqueda}`)
        const data = await response.json()
        return data.results.map(item => ({...item, categoria}))
    }

    function mostrarResultados (resultados){
        containercard.innerHTML=''
        if (resultados.length === 0){
            noHayResultados()
        } else{
            for (const resultado of resultados) {
                if (resultado.categoria === 'people'){
                    createCharacterCard(resultado)           
                } else if (resultado.categoria === 'starships'){
                    createStarshipCard(resultado)
                } else if (resultado.categoria === 'films'){
                    createFilmCard(resultado)
                }
            }
        }
        
    }

    const endpointPersonajes = "https://swapi.dev/api/people/"
    const endpointNaves = "https://swapi.dev/api/starships/"
    const endpointPeliculas = "https://swapi.dev/api/films/"

    charactersbutton.addEventListener('click', async () => {
        searchBar.value = ''
        containercard.innerHTML = ''
        charactersbutton.disabled = true
        starshipsbutton.disabled = true
        filmsbutton.disabled = true
        await obtenerPersonajes(endpointPersonajes)
        charactersbutton.disabled = false
        starshipsbutton.disabled = false
        filmsbutton.disabled = false
    })

    starshipsbutton.addEventListener('click', async () => {
        searchBar.value = ''
        containercard.innerHTML = ''
        charactersbutton.disabled = true
        starshipsbutton.disabled = true
        filmsbutton.disabled = true
        await obtenerNaves(endpointNaves)
        charactersbutton.disabled = false
        starshipsbutton.disabled = false
        filmsbutton.disabled = false
    })

    filmsbutton.addEventListener('click', async () => {
        searchBar.value = ''
        containercard.innerHTML = ''
        charactersbutton.disabled = true
        starshipsbutton.disabled = true
        filmsbutton.disabled = true
        await obtenerPeliculas(endpointPeliculas)
        charactersbutton.disabled = false
        starshipsbutton.disabled = false
        filmsbutton.disabled = false
    })

    /*
    async function obtenerYMostrarDatos(endpoint, createCard) {
        try {
            containercard.innerHTML=''
            await obtenerYMostrar(endpoint, createCard);
        } catch (error) {
            console.log('Error al obtener los datos', error);
        }
    }

    async function obtenerYMostrar(url, createCard) {
        const response = await fetch(url);
        const data = await response.json();
        createCards(data.results, createCard);
        if (data.next) {
            await obtenerYMostrar(data.next, createCard);
        }
    }

    function createCards(items, createCard) {
        for (let item of items) {
            createCard(item);
        }
    }
        */
    
    
    async function obtenerPersonajes(url=endpointPersonajes){
        try{
            const response = await fetch(url)
            const data = await response.json()
            createCardsPersonajes(data.results)
            if (data.next) {
                await obtenerPersonajes(data.next)
            }
        }catch(error){
            console.log('Error al obtener los personajes', error)
        } 
    } 

    function createCardsPersonajes(personajes) {
        for (let personaje of personajes) {
            createCharacterCard(personaje)
        }
    }

    async function obtenerNaves(url=endpointNaves){
        try{
            const response = await fetch(url)
            const data = await response.json()
            createCardsNaves(data.results)
            if (data.next) {
                await obtenerNaves(data.next)
            }
        }catch(error){
            console.log('Error al obtener las naves espaciales.', error)
        } 
    } 

    function createCardsNaves(naves) {
        for (let nave of naves) {
            createStarshipCard(nave);
        }
    }

    async function obtenerPeliculas(url=endpointPeliculas){
        try{
            const response = await fetch(url)
            const data = await response.json()
            createCardsPeliculas(data.results)
            if (data.next) {
                await obtenerPeliculas(data.next)
            }
        }catch(error){
            console.log('Error al obtener las películas.', error)
        } 
    } 

    function createCardsPeliculas(peliculas) {
        for (let pelicula of peliculas) {
            createFilmCard(pelicula)
        }
    }


    function createCharacterCard (personaje) {
        const {name,gender,height,mass,birth_year,eye_color,skin_color} = personaje
            containercard.innerHTML+= `
            <div class="card">
                <div class="card-body" >
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Género: ${gender}</p>
                    <p class="card-text">Altura: ${height} cm</p>
                    <p class="card-text">Peso: ${mass} kg</p>
                    <p class="card-text">Año de nacimiento: ${birth_year}</p>
                    <p class="card-text">Color de ojos: ${eye_color}</p>
                    <p class="card-text">Color de piel: ${skin_color}</p>
                </div>
            </div>`
    }

    function createStarshipCard (nave) {
        const {name,model,cost_in_credits,manufacturer,passengers} = nave
            containercard.innerHTML+= `
            <div class="card">
                <div class="card-body" >
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Modelo: ${model}</p>
                    <p class="card-text">Costo en créditos: ${cost_in_credits}</p>
                    <p class="card-text">Fabricante: ${manufacturer}</p>
                    <p class="card-text">Cant. de pasajeros: ${passengers}</p>
                </div>
            </div>`
    }

    function createFilmCard (pelicula) {
        const {title,director,producer,opening_crawl,release_date} = pelicula
            containercard.innerHTML+= `
            <div class="card" style="width: 28rem">
                <div class="card-body" >
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Director: ${director}</p>
                    <p class="card-text">Productor/es: ${producer}</p>
                    <p class="card-text">Descripción: ${opening_crawl}</p>
                    <p class="card-text">Fecha de lanz.: ${release_date}</p>
                </div>
            </div>`
    }

    function noHayResultados(){
        const mensaje = document.createElement('div');
        mensaje.classList.add('sin-resultados');
        mensaje.textContent = 'No se encontraron resultados para su búsqueda.';
        containercard.appendChild(mensaje);
    }
})