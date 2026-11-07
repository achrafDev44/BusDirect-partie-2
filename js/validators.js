export function validerNom(trajet, nom, ancienSiege= null){
    // verifier si le nom et vide
    if(nom.trim() ===""){
        return "Le nom de passager est obligatoire.";
    } 
    // verifier si le nom deja existe
    const existe =trajet.reservations.find(reservation =>
        reservation.name.toLowerCase() === nom.trim().toLowerCase() && reservation.seat !== ancienSiege
    );
    if(existe){
        return "Ce nom deja utiliser dans ce trajet."
    }
    const existeAttente = trajet.waitingList.find(personne =>
        personne.name.toLowerCase()=== nom.trim().toLowerCase()  
    );
    if(existeAttente){
        return "ce numero deja utilise dans ce trajet";
    }
    return "";
}
export function validerTelephone(trajet, telephone,ancienSiege= null){
    // verifier  format du telephone
    const telephoneCorrect = /^0[67]\d{8}$/;

    if(telephoneCorrect.test(telephone) === false){
        return " telephone doit contenir 10 chiffres";
    }
    // verifier si telephone deja exixte
    const existe = trajet.reservations.find(reservation =>
        reservation.phone ===telephone && reservation.seat !==ancienSiege
    );
    if (existe){
        return "ce numero deja utilise dans ce trajet";
    }
    // verifien la liste d'attente
    const existeAttente = trajet.waitingList.find(personne =>
        personne.phone ===telephone
    );
    if(existeAttente){
        return "ce numero deja utilise dans ce trajet";
    }
    return ""
}
