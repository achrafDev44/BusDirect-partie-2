// import "./store.js"
import { chargerTrajets , sauvegarder } from "./store.js";
chargerTrajets().then(data => {
    sauvegarder(data);
    console.log("sauvegardé");
});
