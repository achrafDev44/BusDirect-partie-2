// import "./store.js"
import { chargerTrajets } from "./store.js";
chargerTrajets().then(data => {
    console.log(data);
});
