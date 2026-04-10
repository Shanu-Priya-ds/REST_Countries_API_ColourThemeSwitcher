import { fetchCountries } from "./services/apiservices.js";

let bodyElement = document.body;
let moonIcon: HTMLElement|null = document.getElementById("moon_icon");


bodyElement.addEventListener("click",()=>{
    bodyElement.classList.toggle("dark-mode");
})

if(moonIcon!=null){
    moonIcon.addEventListener("click",()=>{
        bodyElement.classList.toggle("dark-mode");
    })
}else{
    console.log("Moon icon element null");
}

fetchCountries();