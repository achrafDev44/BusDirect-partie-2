import { initialiser } from "./store.js";
import { placesLibres , estComplet } from "./reservations.js";
// recupérer parametre  id 
// lire les parametre de url
const parametres = new URLSearchParams(window.location.search); 
const idTrajet = Number(parametres.get("id"));

// charger les trajets et chercher le trajet selectionné 
async function demarrer() {
    const trips = await initialiser();
    const trajet = trips.find(trip => trip.id === idTrajet);
    
    console.log("Capacité :", trajet.capacity);
    console.log("Réservations :", trajet.reservations);
    console.log("Nombre de réservations :", trajet.reservations.length);


    
    console.log("Trajet sélectionné :", trajet);

    if (trajet === undefined) {
        console.log("Trajet non trouvé");
        return;
    }

    const infoTrajet = document.querySelector("#infos-trajet");
    infoTrajet.innerHTML = `
        <h2 class="text-xl font-bold">${trajet.departure} -> ${trajet.destination}</h2>
        <p>Départ : ${trajet.departureTime}</p>
        <p>Arrivée : ${trajet.arrivalTime}</p>
        <p>Prix : ${trajet.price} DH</p>    
        <p>Places : ${trajet.reservations.length} / ${trajet.capacity}</p>
        `;

    const planBus = document.querySelector("#plan-bus");
    planBus.innerHTML = "";
    planBus.className = "grid grid-cols-4 gap-4 p-2 bg-gray-100 rounded-lg shadow-md";

    for (let i = 1; i <= 20; i++) {

        const siege = document.createElement("div");
        const reservation = trajet.reservations.find(
            reservation =>reservation.seat === i
        );

        siege.className = "border  px-3 py-5 text-center";
        if(reservation){
            siege.textContent = `${i} - ${reservation.name}`;
            siege.classList.add("bg-red-500" ,"text-white");
        }else {
            siege.textContent = `${i} - Libre`
            siege.classList.add("bg-green-500","text-white")
        }
        planBus.appendChild(siege);
    }
}
demarrer();