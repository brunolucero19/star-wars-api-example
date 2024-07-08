document.addEventListener('DOMContentLoaded',() =>{
    const searchBar = document.querySelector('#search-bar')
    const containercard = document.querySelector('#container-card')
    const charactersbutton = document.querySelector('#characters-button')
    const starshipsbutton = document.querySelector('#starships-button')
    const filmsbutton = document.querySelector('#films-button')

    //Función para el evento de la barra de búsqueda
    searchBar.addEventListener('input', async (e) => {
        const busqueda = e.target.value.toLowerCase() //Convertimos el valor que hay en la barra de búsqueda a minúsculas
        if (busqueda){
            const characters = await obtenerDatos ('people',busqueda)
            const starships = await obtenerDatos ('starships',busqueda)
            const films = await obtenerDatos ('films',busqueda)

            mostrarResultados([...characters, ...starships, ...films]) //LLamamos a mostrar resultados con un array que contiene a todos los resultados que se encontraron anteriormente. 

        } else {
            containercard.innerHTML=''
        }

    })

    async function obtenerDatos(categoria,busqueda) {
        const response = await fetch(`https://swapi.dev/api/${categoria}/?search=${busqueda}`) //Buscamos los resultados que hay en la API de acuerdo a si es un personaje, una nave espacial o una película.
        const data = await response.json()
        return data.results.map(item => ({...item, categoria})) //Generamos un nuevo array donde a cada resultado de la búsqueda le agregamos una categoría, que sería people, starship o film. Éste array es el retorno a la función del evento. 
    }

    function mostrarResultados (resultados){
        containercard.innerHTML=''
        if (resultados.length === 0){
            noHayResultados() //Si no hay resultados se llama a una función que muestra que no hay resultados para esa búsqueda. 
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
        //Vamos mostrando los resultados creando una card para cada resultado dependiendo de su categoría. 
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

        //En ésta función se trata el evento de hacer click en el botón de los personajes, se deshabilitan temporalmente los botones mientras se espera la respuesta de la API y el retorno de la función obtenerPersonajes. 
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

        //En ésta función se trata el evento de hacer click en el botón de las naves espaciales, se deshabilitan temporalmente los botones mientras se espera la respuesta de la API y el retorno de la función obtenerNaves. 
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

        //En ésta función se trata el evento de hacer click en el botón de las películas, se deshabilitan temporalmente los botones mientras se espera la respuesta de la API y el retorno de la función obtenerPelículas. 
    })

    async function obtenerPersonajes(url=endpointPersonajes){
        try{
            const response = await fetch(url)
            const data = await response.json()
            createCardsPersonajes(data.results)
            if (data.next) {
                await obtenerPersonajes(data.next) //Si existe una página siguiente de datos, llama nuevamente a la función obtenerPersonajes cambiando el endpoint, ya que la propiedad "next" contiene la url de la siguiente página. Así, obtenemos un array con todos los personajes. 
            }
        }catch(error){
            console.log('Error al obtener los personajes', error)
        } 
    } 

    //Función que llama a la función createCharacterCard, para crear una card por cada personaje que obtuvimos como resultado de la API. 
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
                await obtenerNaves(data.next) //Si existe una página siguiente de datos, llama nuevamente a la función obtenerNaves cambiando el endpoint, ya que la propiedad "next" contiene la url de la siguiente página. Así, obtenemos un array con todas las naves espaciales.
            }
        }catch(error){
            console.log('Error al obtener las naves espaciales.', error)
        } 
    } 

    //Función que llama a la función createStarshipCard, para crear una card por cada nave que obtuvimos como resultado de la API. 
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

    //Función que llama a la función createFilmCard, para crear una card por cada película que obtuvimos como resultado de la API. 
    function createCardsPeliculas(peliculas) {
        for (let pelicula of peliculas) {
            createFilmCard(pelicula)
        }
    }


    //Función que se encarga de recibir un objeto que es un personaje, y se lo desestructura para crear una card usando sus distintas propiedades.Se utiliza el código de una card que nos brinda BootStrap, añadiendo además mi propio estilo CSS.  
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

    //Función que se encarga de recibir un objeto que es una nave espacial, y se lo desestructura para crear una card usando sus distintas propiedades. 
    function createStarshipCard (nave) {
        const {name,model,cost_in_credits,manufacturer,passengers} = nave
            containercard.innerHTML+= `
            <div class="card starshipCard">
                <div class="card-body" >
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Modelo: ${model}</p>
                    <p class="card-text">Costo en créditos: ${cost_in_credits}</p>
                    <p class="card-text">Fabricante: ${manufacturer}</p>
                    <p class="card-text">Cant. de pasajeros: ${passengers}</p>
                </div>
            </div>`
    }

    //Función que se encarga de recibir un objeto que es una película, y se lo desestructura para crear una card usando sus distintas propiedades. 
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

    //Función que crea un "div", el cuál contiene un texto indicando que no hay resultados para la búsqueda. 
    function noHayResultados(){
        const mensaje = document.createElement('div'); //Se crea un elemento, de tipo "div"
        mensaje.classList.add('sin-resultados'); //Se le añade la clase, a la cuál le dimos sus propiedades en el CSS. 
        mensaje.textContent = 'No se encontraron resultados para su búsqueda.'; //Se añade el contenido del div. 
        containercard.appendChild(mensaje); //Se añade el div al contenedor de las cards. 
    }
})