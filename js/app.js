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
