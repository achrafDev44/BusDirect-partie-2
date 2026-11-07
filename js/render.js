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
    let recetteTotale = 0;

    trips.forEach(function(trip) {
        recetteTotale = recetteTotale + (trip.reservations.length * trip.price);
    });

    document.getElementById("recette-total").textContent =
        recetteTotale + " DH";
    
    let startIndex = (page-1) * size;
    let endIndex = startIndex + size;

    let selectedTrips = modifiedTrips.slice(startIndex, endIndex);

    selectedTrips.forEach((trip) => {
        let card = document.createElement("div");

        card.className ="bg-white p-3 sm:p-5 rounded-2xl shadow-md flex flex-col gap-3 min-w-0";

        card.innerHTML = `
        <h2 class="text-xl font-bold bg-blue-950 text-white p-2 rounded"> ${trip.departure}->${trip.destination}</h2>
        
        <p class="text-lg font-bold text-blue-950"> Départ : ${trip.departureTime}</p>
        <p class="text-lg font-bold text-blue-950"> Arrivée : ${trip.arrivalTime}</p>
        <p class="text-lg font-bold text-blue-950"> Prix : ${trip.price} DH</p>
        <p class="text-lg font-bold text-blue-950"> Capacité : ${trip.reservations.length} / ${trip.capacity}</p>
        <p class="text-lg font-bold text-blue-950"> Liste d'attente : ${trip.waitingList.length}</p>

        <span class="${trip.reservations.length === trip.capacity ? "bg-red-100 text-red-600": "bg-green-100 text-green-600"}">
         ${trip.reservations.length === trip.capacity ? "Complet" : "Disponible"}
        </span>
        <a href="cabine.html?id=${trip.id}" class="bg-blue-900 text-white font-bold py-2 px-4 rounded">Voir le trajet</a>
        </a>`

        tripsContainer.appendChild(card);     
    }),
    renderPagination(modifiedTrips, page, size);
}
export function handleFilter(){
    const champRecherche = document.getElementById("recherche");
    const champStatut = document.getElementById("filtre-statut");

    const city = champRecherche.value.toLowerCase().trim();
    const status = champStatut.value
          
    const filtreTrips = trips.filter(function (trip){
        const matchCity =
            trip.departure.toLowerCase().includes(city) || 
            trip.destination.toLowerCase().includes(city);

        let matchFilter = false;
        if (status === "tous"){
            matchFilter = true;
        } else if (status === "disponible"){
            matchFilter = trip.capacity > trip.reservations.length;
        } else if (status === "complet"){
            matchFilter = trip.capacity === trip.reservations.length
        }
        return matchCity && matchFilter
    });
    renderTrips(filtreTrips, 1, 6);                      
}
export function renderPagination(modifiedTrips, currentPage, pageSize) {
    const pagination = document.getElementById("pagination");

    pagination.innerHTML = "";

    const totalPages = Math.ceil(modifiedTrips.length / pageSize);

    if (totalPages <= 1) {
        return;
    }

    // Bouton precedent
    if (currentPage > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "<";

        prevBtn.addEventListener("click", function() {
            renderTrips(modifiedTrips, currentPage - 1, pageSize);
        });

        pagination.appendChild(prevBtn);
    }

    // Numero des pages
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        btn.addEventListener("click", function() {
            renderTrips(modifiedTrips, i, pageSize);
        });

        pagination.appendChild(btn);
    }

    // Bouton suivant
    if (currentPage < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = ">";

        nextBtn.addEventListener("click", function() {
            renderTrips(modifiedTrips, currentPage + 1, pageSize);
        });

        pagination.appendChild(nextBtn);
    }
}