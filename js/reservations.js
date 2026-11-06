export const placesLibres = (trajet) => {
    return trajet.capacity - trajet.reservations.length;
};

export const estComplet = (trajet) => {
    return placesLibres(trajet) === 0;
};