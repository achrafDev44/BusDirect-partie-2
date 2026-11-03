// import "./store.js"
// import { chargerTrajets , sauvegarder} from "./store.js";
// chargerTrajets().then(data => {
//     sauvegarder(data);
//     console.log("sauvegardé");
// });
import { initialiser} from "./store.js";
import { renderTrips } from "./render.js";

async function demarrer(){
    const trips = await initialiser();
    renderTrips(trips, 1, 6);
}
demarrer();
