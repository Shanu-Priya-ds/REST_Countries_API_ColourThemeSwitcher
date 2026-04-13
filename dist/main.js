import { fetchAndCreateCountryDetails } from "./country/countrydetails.js";
import { fetchCountries, fetchCountryByCode } from "./services/apiservices.js";
import { createDetailRowAndAppend, createElement, createElementAndAppend } from "./utils/domUtils.js";
let bodyElement = document.body;
let moonIcon = document.getElementById("moon_icon");
let toggleBtn = document.getElementById("toggle-button");
let countriesDiv = document.getElementById("countries");
let dropdown = document.getElementById("regionDropDown");
let searchCountryElem = document.getElementById("search-country");
let countriesFragment = document.createDocumentFragment();
let mainElement = document.getElementById("main");
let countriesList;
addEventListener("load", (event) => {
    //create container for each country
    createCountriesElement();
    //set the already applied theme if the page load initiate from details page
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
        document.body.classList.add("dark-mode");
        moonIcon?.classList.replace("fa-moon", "fa-sun");
        if (toggleBtn && toggleBtn.lastElementChild)
            toggleBtn.lastElementChild.textContent = "Light Mode";
    }
});
if (toggleBtn != null) {
    toggleBtn.addEventListener("click", () => {
        const isDark = bodyElement.classList.toggle("dark-mode");
        if (isDark) {
            if (moonIcon)
                moonIcon.classList.replace("fa-moon", "fa-sun");
            if (toggleBtn.lastElementChild)
                toggleBtn.lastElementChild.textContent = "Light Mode";
            // localStorage.setItem("theme", "dark");
        }
        else {
            if (moonIcon)
                moonIcon.classList.replace("fa-sun", "fa-moon");
            if (toggleBtn.lastElementChild)
                toggleBtn.lastElementChild.textContent = "Dark Mode";
        }
    });
}
else {
    console.log("Moon icon element null");
}
//add event listener to filter dropdown
if (dropdown != null) {
    dropdown.addEventListener("change", handleFilterdCountries);
}
if (searchCountryElem != null) {
    searchCountryElem.addEventListener("input", handleSearchCountry);
}
//ADD event listener to the parent container and delegates to all the country container
countriesDiv?.addEventListener('click', handlePageRedirect);
export function handlePageRedirect(event) {
    console.log(event);
    let targetElement = event.target;
    if (targetElement.nodeName === "IMG" || targetElement.nodeName === "BUTTON") {
        //fetch the countrydetails page and insert the content to main conainter in index.html page. 
        fetch("countrydetails.html").
            then((result) => {
            //   console.log(result)
            return result.text();
        }).then((html) => {
            console.log(html);
            if (mainElement != null)
                mainElement.innerHTML = html;
            //add event listener to redirect to main page
            let backLink = document.getElementById("backLink");
            backLink?.addEventListener('click', () => {
                let isDark = document.body.classList.contains("dark-mode");
                localStorage.setItem("theme", isDark ? "dark" : "light");
                window.location.href = "index.html";
            });
            //populate country details
            let countryCode = targetElement.parentElement?.getAttribute("data-country-code");
            console.log(targetElement.parentElement);
            console.log(targetElement.parentElement?.getAttribute("data-country-code"));
            if (!countryCode)
                countryCode = localStorage.getItem("countryCode");
            fetchAndCreateCountryDetails(countryCode, mainElement);
        });
    }
}
/**
 * create country card for the selected region
 * if all region option is selected, create cards for all the countires
 */
function handleFilterdCountries(event) {
    let selectedElemnt = event.target;
    let selectedValue = selectedElemnt.value;
    if (countriesDiv != null) { // remove the existing DOM elements 
        countriesDiv.innerHTML = "";
    }
    //create filtered country card based on the sleected region
    if (countriesList && countriesList.length > 0) {
        if (selectedValue == "All") {
            createAllCountriesElement();
        }
        else {
            countriesList.forEach((country) => {
                if (selectedValue === country.region) {
                    let countryFragement = createCountryCard(country);
                    countriesDiv?.append(countryFragement);
                }
            });
        }
    }
}
function handleSearchCountry(event) {
    let selectedInput = event.target;
    let searchValue = selectedInput.value;
    if (countriesDiv != null)
        countriesDiv.innerHTML = ""; //remove the existing cards
    if (searchValue && searchValue !== "") {
        createFilteredCountryElement(searchValue);
    }
    else {
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
    let regionList = [];
    //update the value in localsotrage
    localStorage.setItem("countryList", JSON.stringify(countriesList));
    //fetAllCountries();
    createAllCountriesElement();
}
function createAllCountriesElement() {
    countriesList.forEach((country) => {
        //create DOM elements
        let fragment = createCountryCard(country);
        countriesDiv?.append(fragment);
    });
}
function createFilteredCountryElement(searchValue) {
    countriesList.forEach((country) => {
        if (country.name.common.toLowerCase().startsWith(searchValue.toLowerCase())) {
            let fragment = createCountryCard(country);
            countriesDiv?.append(fragment);
        }
    });
}
/***
 * Creates country card continer with data populated
 * and append to the document Fragemnt
 */
function createCountryCard(country) {
    let countryContainer = document.createElement("div");
    countryContainer.className = "card";
    let img = document.createElement("img");
    img.src = country.flags.svg;
    img.alt = country.flags.alt;
    countryContainer.append(img);
    let div1 = document.createElement("div");
    createElementAndAppend("h2", country.name.common, div1);
    createDetailRowAndAppend("Population:", `${country.population}`, div1);
    createDetailRowAndAppend("Region:", `${country.region}`, div1);
    createDetailRowAndAppend("Capital:", `${country.capital}`, div1);
    div1.className = "card-content";
    countryContainer.setAttribute("data-country-code", country.cca3);
    countryContainer.appendChild(div1);
    countriesFragment.append(countryContainer);
    return countriesFragment;
}
//# sourceMappingURL=main.js.map