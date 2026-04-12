import type { Country } from "./models/country.js";
import { fetchCountries } from "./services/apiservices.js";

let bodyElement = document.body;
let moonIcon: HTMLElement | null = document.getElementById("moon_icon");
let countriesDiv = document.getElementById("countries");
let dropdown = document.getElementById("regionDropDown");
let searchCountryElem = document.getElementById("search-country");
let countriesFragment = document.createDocumentFragment();

let countriesList: Country[];

addEventListener("load", (event) => {
    //create container for each country
    createCountriesElement();
})

// bodyElement.addEventListener("click",()=>{
//     bodyElement.classList.toggle("dark-mode");
// })

if (moonIcon != null) {
    moonIcon.addEventListener("click", () => {
        bodyElement.classList.toggle("dark-mode");
    })
} else {
    console.log("Moon icon element null");
}

//add event listener to filter dropdown
if (dropdown != null) {
    dropdown.addEventListener("change", handleFilterdCountries);
}

if (searchCountryElem != null) {
    searchCountryElem.addEventListener("input", handleSearchCountry);
}

/**
 * create country card for the selected region
 * if all region option is selected, create cards for all the countires
 */
function handleFilterdCountries(event: Event) {
    let selectedElemnt = event.target as HTMLInputElement;
    let selectedValue = selectedElemnt.value;
    if (countriesDiv != null) { // remove the existing DOM elements 
        countriesDiv.innerHTML = "";
    }
    //create filtered country card based on the sleected region
    if (countriesList && countriesList.length > 0) {
        if (selectedValue == "All") {
            createAllCountriesElement();
        } else {
            countriesList.forEach((country: Country) => {
                if (selectedValue === country.region) {
                    let countryFragement = createCountryCard(country);
                    countriesDiv?.append(countriesFragment);
                }
            });
        }
    }

}

function handleSearchCountry(event: Event) {
    let selectedInput = event.target as HTMLInputElement;
    let searchValue = selectedInput.value;
    countriesDiv.innerHTML = "";//remove the existing cards
    if (searchValue && searchValue !== "") {
         createFilteredCountryElement(searchValue);

    } else {
        //populate all the countries
        createAllCountriesElement();
    }
}

/**
 * Fetch all the countries via API.
 * Process each country object and create a country card 
 * and append to the parent container
 */
async function createCountriesElement() {
    countriesList = await fetchCountries();
    let regionList: string[] = [];
    console.log(countriesList);
    //fetAllCountries();
    createAllCountriesElement();
}

function createAllCountriesElement() {
    countriesList.forEach((country: Country) => {
        console.log(country.name.common);
        //create DOM elements
        let fragment = createCountryCard(country);
        countriesDiv?.append(fragment);
    });
}

function createFilteredCountryElement(searchValue: string) {
    countriesList.forEach((country: Country) => {
        console.log(country.name.common);
        if (country.name.common.toLowerCase().startsWith(searchValue.toLowerCase())) {
            let fragment = createCountryCard(country);
            countriesDiv?.append(fragment);
        }
    })
}

/***
 * Creates country card continer with data populated
 * and append to the document Fragemnt
 */
function createCountryCard(country: Country): DocumentFragment {
    let countryContainer = document.createElement("div");
    countryContainer.className = "card";
    let img = document.createElement("img");
    img.src = country.flags.svg;
    img.alt = country.flags.alt;
    countryContainer.append(img);

    let div1 = document.createElement("div");

    let h3 = createElement("h3", country.name.common);
    div1.appendChild(h3);
    let span1 = createElement("span", `Population:${country.population}`)
    div1.appendChild(span1);
    let span2 = createElement("span", `Region:${country.region}`)
    div1.appendChild(span2)
    let span3 = createElement("span", `Capital:${country.capital}`)
    div1.appendChild(span3)
    div1.className = "card-content";
    countryContainer.appendChild(div1);

    countriesFragment.append(countryContainer);
    return countriesFragment;
}
function createElement(elementName: string, innerText: string): HTMLElement {
    let element = document.createElement(elementName);
    element.innerText = innerText;
    return element;
}


