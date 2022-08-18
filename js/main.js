const api =  axios.create({
    baseURL: "https://rickandmortyapi.com/api/character",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
});

//Event
window.scroll(0, 0)
statusList.addEventListener("click", ()=>{

    stats = statusList.value
    filtrarPersonajes();
})


genderSelected.addEventListener("click", ()=>{
    gender = genderSelected.value;
    // console.log(gender);
    // console.log(stats)
    filterForGender();
})

const scroll = document.querySelector(".scroll");
// window.addEventListener("scroll", filtrarPersonajesScrollInfnito);

async function createCard(results, contenedor){
     await results.map(personaje=>{

        const divContainer = document.createElement("div");
        divContainer.classList.add("card-container");

        const cardImg = document.createElement("img");
        cardImg.classList.add("card-img");
        cardImg.setAttribute("src", personaje.image);
        cardImg.setAttribute("loading", "Lazy")
        const divInfo = document.createElement("div");
        divInfo.classList.add("card-info");

        const pName = document.createElement("p");
        pName.classList.add("card-name");
        pName.textContent = personaje.name;


        const pSpecie = document.createElement("p");
        pSpecie.classList.add("card-specie");
        pSpecie.innerText = personaje.species;
        


        const pStatus = document.createElement("p");
        pStatus.classList.add("card-status");
        pStatus.textContent = personaje.status;


        divInfo.appendChild(pName);
        divInfo.appendChild(pSpecie);
        divInfo.appendChild(pStatus);


        divContainer.appendChild(cardImg);
        divContainer.appendChild(divInfo);


        contenedor.appendChild(divContainer)
        
        
    
})
}


async function rickAndMorty(){
    const {data} = await api()
    const personajes = data.results;
    createCard(personajes, cardList);
    const btnCarga = document.createElement("button");
    btnCarga.classList.add("btnLoad")
    btnCarga.textContent = "Cargar más";
    paginacion.appendChild(btnCarga);
    btnCarga.addEventListener("click", ()=>{

        filtrarPersonajes()
    }

     )
}

async function filtrarPersonajes(){
    // const {data}  = await api({
    //     params: {
    //         "status": stats,
    //         "gender": gender,
    //     }});
    // cardList.innerText= "";
    // const personajes = data.results;
    // createCard(personajes, cardList);

    // const {scrollHeight,scrollTop,scrollWidth} = document.documentElement;
    //     const isBottom =  (scrollHeight- 130)<= (scrollTop + scrollWidth);
    //     if(isBottom){
    //         console.log("Llegamos al final")
            const {data}  = await api({
                params: {
                    "status": stats,
                    "gender": gender,
                    "page" : contador++,

                }});
                 const personajes = data.results;
                createCard(personajes, cardList);
        
        if(contador > 100){
            contador = 1;
        }
        // btnCarga.classList.add("btnLoad")
        // btnCarga.textContent= "Cargar más";
        // paginacion.appendChild(btnCarga);
        // btnCarga.addEventListener("click", ()=>{

        //     filtrarPersonajes &&  btnCarga.remove()
        // })
    
    }



async function filtrarPersonajesScrollInfnito(){
        const {scrollHeight,scrollTop,scrollWidth} = document.documentElement;
        const isBottom =  (scrollHeight- 100)<= (scrollTop + scrollWidth);
        if(isBottom){
            console.log("Llegamos al final")
            const {data}  = await api({
                params: {
                    "status": stats,
                    "gender": gender,
                    "page" : contador++,

                }});
                 const personajes = data.results;
                createCard(personajes, cardList);
        }

}

async function filterForGender(){
    const {data} = await api({
        params: {
            "status": stats,
            "gender": gender,
        }});
    cardList.innerHTML="";
    const personaje  = data.results;
    createCard(personaje, cardList);

    
}
async function filterForGender(){
    const {data} = await api({
        params: {
            "status": stats,
            "gender": gender,
            "page" : contador,
        }});
    cardList.innerHTML="";
    const personaje  = data.results;
    createCard(personaje, cardList);
    
    const {scrollHeight,scrollTop,scrollWidth} = document.documentElement;
    if((scrollHeight- 20)<= (scrollTop + scrollWidth)){
        console.log("recargar")
    }else{
        console.log("todavia Falta")
    }
}

function final (){
    
}


rickAndMorty();