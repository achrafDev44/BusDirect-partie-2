import { initialiser, sauvegarder } from "./store.js";
import { placesLibres, estComplet, reserver, estVIP, prixSiege } from "./reservations.js";
import { validerNom, validerTelephone } from "./validators.js";

// recupérer parametre  id 
// lire les parametre de url
const parametres = new URLSearchParams(window.location.search); 
const idTrajet = Number(parametres.get("id"));

// charger les trajets et chercher le trajet selectionné 
async function demarrer() {
    const trips = await initialiser();
    console.log("Id dans url:",idTrajet);
    console.log("Liste des trajts:" ,trips);
    const trajet = trips.find(trip => trip.id === idTrajet);

    if (trajet === undefined) {
        console.log("Trajet non trouvé");
        return;
    }
    
    console.log("Capacité :", trajet.capacity);
    console.log("Réservations :", trajet.reservations);
    console.log("Nombre de réservations :", trajet.reservations.length);


    
    console.log("Trajet sélectionné :", trajet);

    const infoTrajet = document.querySelector("#infos-trajet");
    const planBus = document.querySelector("#plan-bus");
    function afficherSieges(){
        planBus.innerHTML = "";

        infoTrajet.innerHTML = `
            <h2 class="text-xl font-bold">${trajet.departure} -> ${trajet.destination}</h2>
            <p>Départ : ${trajet.departureTime}</p>
            <p>Arrivée : ${trajet.arrivalTime}</p>
            <p>Prix : ${trajet.price} DH</p>    
            <p>Places : ${trajet.reservations.length} / ${trajet.   capacity}</p>
            <p>Recette totale : ${trajet.reservations.length * trajet.price} DH</p>
        `;

   
        for (let i = 1; i <= 20; i++) {

            const siege = document.createElement("div");
            const reservation = trajet.reservations.find(
                reservation =>reservation.seat === i
            );

            siege.className = "border p-2 sm:px-3 sm:py-5 text-center text-xs sm:text-sm break-words";

            if(reservation){
                siege.textContent = `${i} - ${reservation.name}`;
                siege.classList.add("bg-red-500" ,"text-white");
            }else {
                siege.textContent = `${i} - Libre`
                siege.classList.add("bg-green-500","text-white")
            }
            if (estVIP(i)) {
                const badge = document.createElement("span");
                badge.textContent = "VIP";
                badge.className = "block text-xs font-bold text-yellow-300";

                siege.classList.add("border-4", "border-yellow-400");
                siege.appendChild(badge);
            }
        planBus.appendChild(siege);
        }
    }
    afficherSieges();

    const formReserver = document.querySelector("#form-reserver");
    const fieldsetReserver = document.querySelector("#fieldset-reserver");
    const fieldsetAttente = document.querySelector("#fieldset-attente")

    function gererFormulaires() {
        if (estComplet(trajet)) {
            fieldsetReserver.disabled = true;
            fieldsetAttente.disabled = false;
        } else {
            fieldsetReserver.disabled = false;
            fieldsetAttente.disabled = true;
        }
    }
    gererFormulaires();

    const champNom = document.querySelector("#reserver-nom");
    const champTel = document.querySelector("#reserve-tel");
    const champSiege = document.querySelector("#reserve-siege");

    const message = document.querySelector("#message-reserve");

    // formulaire modfier
    const formModifier = document.querySelector("#form-modifier");

    const selectPassager = document.querySelector("#modifier-passager");
    const modifierNom = document.querySelector("#modifier-nom");
    const modfierTel = document.querySelector("#modifier-tel");
    const modifierSiege = document.querySelector("#modifier-siege");
    const messageModifier = document.querySelector("#message-modifier");

    // Formulaire annuler
    const formAnnuler= document.querySelector("#form-annuler");
    const selectAnnuler= document.querySelector("#annuler-passager");
    const messageAnnuler= document.querySelector("#message-annuler");

    // Formulaire liste d'attente
    const formAttente = document.querySelector("#form-attente");
    const attenteNom = document.querySelector("#attente-nom");
    const attenteTel = document.querySelector("#attente-tel");
    const messageAttente = document.querySelector("#message-attente");
    const listeAttente = document.querySelector("#liste-attente");

    const erreurNomAttente = document.querySelector("#erreur-attente-nom");
    const erreurTelAttente = document.querySelector("#erreur-attente-tel");

    selectPassager.innerHTML ='<option value="">Choisir un passager</option>'

    for (let i = 0; i < trajet.reservations.length; i++) {
        const reservation = trajet.reservations[i];

        const option = document.createElement("option");
        option.value = reservation.seat;
        option.textContent = reservation.name + " - Siège " + reservation.seat;

        selectAnnuler.appendChild(option);
}
    for(let i=0;i<trajet.reservations.length;i++){
        const reservation=trajet.reservations[i];

        const option = document.createElement("option");
        option.value = reservation.seat;
        option.textContent=reservation.name+"- siege"+reservation.seat;
        selectPassager.appendChild(option);
    }
    selectPassager.addEventListener("change",function(){
        const reservation = trajet.reservations.find(
            reservation => reservation.seat=== Number(selectPassager.value)
        );
        if(reservation){
            modifierNom.value=reservation.name
            modfierTel.value=reservation.phone
            // afficher les sieges disponible
            modifierSiege.innerHTML='<option value="">Choisir un siege</option>';
            for(let i=1;i<=20;i++){
                const existe = trajet.reservations.find(
                    reservation=>reservation.seat===i
                );
                   if (existe === undefined || i === reservation.seat) {
                const option = document.createElement("option");

                option.value = i;
                option.textContent = "Siège " + i;

                modifierSiege.appendChild(option);
            }
        }
        modifierSiege.value=reservation.seat;
    }
    
    })
    // afficher les sieges
    champSiege.innerHTML = '<option value="">Choisir un siege libre</option>';

    for (let i=1;i<=20; i++){
         const reservation = trajet.reservations.find(
            reservation =>reservation.seat === i
         );
         
         if (reservation === undefined){
            const option = document.createElement("option");

            option.value = i;
            option.textContent = "Siege " + i;

            champSiege.appendChild(option);
         }
    }
    function afficherListeAttente(){
        listeAttente.innerHTML = "";

        for (let i = 0; i < trajet.waitingList.length; i++) {
            const personne = trajet.waitingList[i];
            const li = document.createElement("li");

            li.textContent = "Position " + (i + 1) + " : " + personne.name + " - " + personne.phone;
            const bouton = document.createElement("button");
            bouton.textContent = "Retirer";
            bouton.type = "button";
            bouton.dataset.index = i;

            li.appendChild(bouton);
            listeAttente.appendChild(li);
        }
    }
    afficherListeAttente();

    listeAttente.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            const index = Number(event.target.dataset.index);

            trajet.waitingList.splice(index, 1);

            sauvegarder(trips);
            afficherListeAttente();
        }
    });

    formReserver.addEventListener("submit", function(event) {
        event.preventDefault();

        const nom = champNom.value.trim();
        const telephone = champTel.value.trim();
        const siege = Number(champSiege.value);

        const erreurNom = document.getElementById("erreur-reserver-nom");
        const erreurTel = document.getElementById("erreur-reserver-tel");

        erreurNom.textContent = validerNom(trajet, nom);
        erreurTel.textContent = validerTelephone(trajet, telephone);

        if (erreurNom.textContent.length > 0 || erreurTel.textContent.length > 0) {
            return;
        }

        if (siege === 0) {
            message.textContent = "Veuillez choisir un siège.";
            return;
        }

        const resultat = reserver(trajet, nom, telephone, siege);
              message.textContent = resultat;

        if (resultat === "Réservation réussie") {
            sauvegarder(trips);
            afficherSieges();
            gererFormulaires();
            formReserver.reset();    
    }
});
    formModifier.addEventListener("submit", function(event){
        event.preventDefault();
        const ancienSiege =Number(selectPassager.value);
        const name = modifierNom.value.trim();
        const phone = modfierTel.value.trim();
        const seat = Number(modifierSiege.value);

       const erreurNomModifier = document.getElementById("erreur-modifier-nom");
        const erreurTelModifier = document.getElementById("erreur-modifier-tel");

        erreurNomModifier.textContent = validerNom(trajet, name, ancienSiege);
        erreurTelModifier.textContent = validerTelephone(trajet, phone, ancienSiege);

        if (erreurNomModifier.textContent.length > 0 ||                 erreurTelModifier.textContent.length > 0) {
            return;
        }

        if (seat === 0 || ancienSiege === 0) {
                messageModifier.textContent = "Veuillez remplir tous les champs";
                return;
        }
        const existe = trajet.reservations.find(
            reservation => reservation.seat === seat &&
            reservation.seat !== ancienSiege
        );

        if (existe) {
             messageModifier.textContent = "Ce siège est déjà occupé";
             return;
    }

        trajet.reservations = trajet.reservations.map(reservation =>{
            if(reservation.seat === ancienSiege){
                return{
                    name:name,
                    phone:phone,
                    seat:seat,
                };
            }else{
                return reservation;
            }
        }
           
    );
    sauvegarder(trips);
    afficherSieges();

    messageModifier.textContent = "Modification réussie";
    formModifier.reset();
        
    });
    formAnnuler.addEventListener("submit", function(event) {
        event.preventDefault();
        const siege = Number(selectAnnuler.value);

        if (siege === 0) {
            messageAnnuler.textContent = "Choisir un passager";
            return;
        }
        
        trajet.reservations = trajet.reservations.filter(
            reservation => reservation.seat !== siege
        );
        if (trajet.waitingList.length > 0) {
            const [premier, ...reste] = trajet.waitingList;

            trajet.waitingList = reste;

            trajet.reservations = [...trajet.reservations, {
                name: premier.name,
                phone: premier.phone,
                seat: siege
            }];
           messageAnnuler.textContent = premier.name + " a obtenu le siège " + siege;
        }else{
           messageAnnuler.textContent = "Annulation réussie";
        }
        afficherListeAttente();
        sauvegarder(trips);
        afficherSieges();
        gererFormulaires();
        formAnnuler.reset();
    });

    formAttente.addEventListener("submit", function(event) {
        event.preventDefault();
        const nom = attenteNom.value.trim();
        const telephone = attenteTel.value.trim();

        erreurNomAttente.textContent = validerNom(trajet, nom);
        erreurTelAttente.textContent = validerTelephone(trajet, telephone);

        if(erreurNomAttente.textContent.length > 0 || erreurTelAttente.textContent.length > 0) {
        return;
        }
        if (estComplet(trajet) === false) {
            messageAttente.textContent = "Le trajet pas encore complet";
             return;
}

        const personne = {
            name: nom,
            phone: telephone
        };

        trajet.waitingList = [...trajet.waitingList, personne];

        sauvegarder(trips);
        afficherListeAttente();
        messageAttente.textContent = "Ajout à la liste d'attente reussi";
        attenteNom.value = "";
        attenteTel.value = "";
});


}
demarrer();