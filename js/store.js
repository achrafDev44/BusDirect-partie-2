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
export function chargerTrajets(){
    return fetch("./data/trips.json")
    .then(response => response.json())
    .catch(error => {
        console.log("Erreur : ", error);
    }
    )
}