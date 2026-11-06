import { initialiser } from "./store.js";
// recupérer id 
const parametres = new URLSearchParams(window.location.search);
const idTrajet = Number(parametres.get("id"));

console.log("ID du trajet :", idTrajet);

// charger les trajets et chercher le trajet selectionné 
async function demarrer() {
    const trips = await initialiser();
    const trajet = trips.find(trip => trip.id === idTrajet);
    console.log("Trajet sélectionné :", trajet);

    const infoTrajet = document.querySelector("#infos-trajet");
    infoTrajet.innerHTML = `
        <h2 class="text-xl font-bold">${trajet.departure} → ${trajet.destination}
        </h2>
        <p>Départ : ${trajet.departureTime}</p>
        <p>Arrivée : ${trajet.arrivalTime}</p>
        <p>Prix : ${trajet.price} DH</p>    
        <p>Places : ${trajet.reservations.length} / ${trajet.capacity}</p>
        `;
}
demarrer();

