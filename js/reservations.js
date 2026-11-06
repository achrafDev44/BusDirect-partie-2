export const placesLibres = (trajet) => {
    return trajet.capacity - trajet.reservations.length;
};

export const estComplet = (trajet) => {
    return placesLibres(trajet) === 0;
};
// verifier si un siege est vip
export const estVIP = (numero) => {
    if (numero === 1 || numero === 2 || numero === 3 || numero === 4) {
        return true;
    } else {
        return false;
    } 
};
export const prixSiege = (prix, numero) => {
    if (estVIP(numero)) {
        return Math.round(prix * 1.1);
    } else {
        return prix;
    }
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