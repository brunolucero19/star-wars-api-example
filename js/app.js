document.addEventListener('DOMContentLoaded',() =>{
    let searchBar = document.querySelector('#search-bar')
    let containercard = document.querySelector('#container-card')
    
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
                let card
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

    function createCharacterCard (personaje) {
        const {name,gender,height,mass,birth_year,eye_color,skin_color} = personaje
            containercard.innerHTML+= `
            <div class="card" style="width: 18rem; margin: 10px;">
                <div class="card-body" >
                    <h5 class="card-title" style="color: blue;">${name}</h5>
                    <p class="card-text" style="margin-bottom: 10px;">Género: ${gender}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Altura: ${height} cm</p>
                    <p class="card-text" style="margin-bottom: 10px;">Peso: ${mass} kg</p>
                    <p class="card-text" style="margin-bottom: 10px;">Año de nacimiento: ${birth_year}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Color de ojos: ${eye_color}</p>
                    <p class="card-text">Color de piel: ${skin_color}</p>
                </div>
            </div>`
    }

    function createStarshipCard (nave) {
        const {name,model,cost_in_credits,manufacturer,passengers} = nave
            containercard.innerHTML+= `
            <div class="card" style="width: 18rem; margin: 10px;">
                <div class="card-body" >
                    <h5 class="card-title" style="color: blue;">${name}</h5>
                    <p class="card-text" style="margin-bottom: 10px;">Modelo: ${model}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Costo en créditos: ${cost_in_credits}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Fabricante: ${manufacturer}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Cant. de pasajeros: ${passengers}</p>
                </div>
            </div>`
    }

    function createFilmCard (pelicula) {
        const {title,director,producer,opening_crawl,release_date} = pelicula
            containercard.innerHTML+= `
            <div class="card" style="width: 18rem; margin: 10px;">
                <div class="card-body" >
                    <h5 class="card-title" style="color: blue;">${title}</h5>
                    <p class="card-text" style="margin-bottom: 10px;">Director: ${director}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Productor/es: ${producer}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Descripción: ${opening_crawl}</p>
                    <p class="card-text" style="margin-bottom: 10px;">Fecha de lanzamiento: ${release_date}</p>
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















let charactersbutton = document.querySelector('#characters-Button')

charactersbutton.addEventListener('click', () => obtenerPersonajes())

const URLBase = "https://swapi.dev/api/"
const endpointPersonajes = "https://swapi.dev/api/people/"

let containercard = document.querySelector('#container-card')

const obtenerPersonajes= async(url=endpointPersonajes)=>{
    try{
        let response = await fetch(url)
        .then(response=>response.json())
        .then(data => {
            createCards(data.results);
            if (data.next) {
                obtenerPersonajes(data.next);
            }
        })
    }catch(error){
        console.log('Error al obtener los personajes')
    }
    
} 




const createCards=(personajes)=>{
    for(let personaje of personajes){
        const {name,gender,height,mass,birth_year,eye_color,skin_color} = personaje
        containercard.innerHTML+= `
        <div class="card" style="width: 18rem; margin: 10px;">
            <div class="card-body" >
                <h5 class="card-title" style="color: blue;">${name}</h5>
                <p class="card-text" style="margin-bottom: 10px;">Género: ${gender}</p>
                <p class="card-text" style="margin-bottom: 10px;">Altura: ${height} cm</p>
                <p class="card-text" style="margin-bottom: 10px;">Peso: ${mass} kg</p>
                <p class="card-text" style="margin-bottom: 10px;">Año de nacimiento: ${birth_year}</p>
                <p class="card-text" style="margin-bottom: 10px;">Color de ojos: ${eye_color}</p>
                <p class="card-text">Color de piel: ${skin_color}</p>
            </div>
        </div>`
        
    }
}
