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

        card.className = "bg-white p-5 rounded-2xl shadow-md flex flex-col gap-3 hover:shadow-xl transition- duration-300";

        card.innerHTML = `
        <h2 class="text-xl font-bold text-blue-950 border-b pb-3">
            ${trip.departure}->${trip.destination}
        </h2>
        
        <p class="text-gray-600> Départ : ${trip.departureTime}</p>
        <p class="text-gray-600> Arrivée : ${trip.arrivalTime}</p>
        <p class="text-lg font-bold text-blue-950"> Prix : ${trip.price} DH</p>
        <p class="text-gray-600> Places : ${trip.reservations.length} / ${trip.capacity}</p>
        <p class="text-gray-600> Liste d'attente : ${trip.waitingList.length}</p>

        <span class = "w-fit px-3 py-1 rounded-full font-bold ${trip.reservations.length === trip.capacity ? "bg-red-100 text-red-600": "bg-green-100 text-green-600"}">
        
         ${trip.reservations.length === trip.capacity ? "Complet" : "Disponible"}
        </span>`
           
        tripsContainer.appendChild(card);     
    })
}

