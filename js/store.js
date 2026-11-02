// test pour voir les trajets
// fetch ("./data/trips.json")
//     .then(response => response.json())
//     .then(data =>{
//         console.log(data);
//     })
//     .catch(error => {
//         console.log("Erreur :" ,error);
//     }
//     )
export let trips = [];

export function chargerTrajets(){
    return fetch("./data/trips.json")
    .then(response => response.json())
    .catch(error => {
        console.log("Erreur : ", error);laisse 
    }
    )
}

export function sauvegarder(trips){
    localStorage.setItem("trips", JSON.stringify(trips));
}

export async function initialiser(){
    const text = localStorage.getItem("trips");
    if(text){
        trips = JSON.parse(text);
        return trips;
    }
    trips = await chargerTrajets();
    sauvegarder(trips);
   
}



