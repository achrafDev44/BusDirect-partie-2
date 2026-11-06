// import "./store.js"
// import { chargerTrajets , sauvegarder} from "./store.js";
// chargerTrajets().then(data => {
//     sauvegarder(data);
//     console.log("sauvegardé");
// });
import { initialiser} from "./store.js";
import { handleFilter, renderTrips } from "./render.js";

const recherche = document.getElementById("recherche");
const filtreStatut = document.getElementById("filtre-statut")

async function demarrer(){
    const trips = await initialiser();
    renderTrips(trips, 1, 6);
}
recherche.addEventListener("input",handleFilter)
filtreStatut.addEventListener("change",handleFilter)
demarrer();

