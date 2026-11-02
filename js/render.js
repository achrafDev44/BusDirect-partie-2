import {trips} from "./store.js";
export function renderTrips(modifiedTrips, page, size){
    if (modifiedTrips === undefined || modifiedTrips === null){
        modifiedTrips = trips;
    }
    if (page === undefined || page ===null){
        page = 1;
    }
    if (size === undefined || size === null){
        size = 6;
    }
    let tripsContainer = document.getElementById("liste-trajets");
    tripsContainer.innerHTML = "";
    
    let startIndex = (page-1) * size;
    let endIndex = startIndex + size;

    let selectedTrips = modifiedTrips.slice(startIndex, endIndex);

    selectedTrips.forEach((trip) => {
        let card = document.createElement("div");

        card.className = "bg-white rounded-xl shadow-md flex flex-col gap-3";

        card.innerHTML = `
            <h2 class= "text-xl font-bold text-blue-950">
            ${trip.departure} -> ${trip.destination}
            </h2>
            <p>Départ : ${trip.departureTime}</p>
            <p>Arrivée : ${trip.arrivalTime}</p>
            <p>Prix : ${trip.price} DH</p>
            <p>Place : ${trip.reservations.length} / ${trip.capacity}</p>
            <p>Liste d'attente : ${trip.waitingList.length}</p>

            <span class = "font-bold ${trip.reservations.length === trip.capacity ? "text-red-600" : "text-green-600"}">
             ${trip.reservations.length === trip.capacity ? "Complet" : "Disponible"}
            </span>`
        tripsContainer.appendChild(card);     
    })

}
