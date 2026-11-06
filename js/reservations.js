export const placesLibres = (trajet) => {
    return trajet.capacity - trajet.reservations.length;
};

export const estComplet = (trajet) => {
    return placesLibres(trajet) === 0;
};

// Reserver une place 
export function reserver(trajet, nom, telephone, siege){
// verifier si le siege  complet
    if(estComplet(trajet)){
        return "le bus est complet";
    }
// verifier si le siege deja  occupe
    let existe = trajet.reservations.find(
        reservation => reservation.seat === siege
    );

    if (existe){
        return "cette place est deja occupee";
    }

    let reservation ={
        name: nom,
        phone: telephone,
        seat: siege
    };
// ajouter la reservations
    trajet.reservations.push(reservation);
    return "Réservation réussie";
 
}