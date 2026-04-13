import { handlePageRedirect } from "../main.js";
import { fetchCountryByCode } from "../services/apiservices.js";
import { createDetailRowAndAppend, createElement, createElementAndAppend } from "../utils/domUtils.js";
/**
 * fetches the contry details by code and create HTML element for all the attributes and display in UI
 */
export async function fetchAndCreateCountryDetails(countryCode, mainElement) {
    if (countryCode != null) {
        let countriesList = await fetchCountryByCode(countryCode);
        let country = countriesList[0];
        //create DOM elements
        if (country) {
            //create all the containers
            let div = document.createElement("div");
            let itemsContainer = document.createElement("section");
            let img = document.createElement("img");
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let div3 = document.createElement("div");
            let div4 = document.createElement("div");
            //set styles to the container
            div.className = "country-details-container";
            div1.className = "country-details";
            itemsContainer.classList = "items-container";
            img.src = country.flags.svg;
            img.alt = country.flags.alt;
            let languageList = " ";
            let firstLanguage = "";
            for (let language in country.languages) {
                if (firstLanguage == "" && language != "en") //certain countries have english as a a first item in the list which 
                    firstLanguage = language;
                if (languageList === " ")
                    languageList = country.languages[language];
                else
                    languageList = languageList + "," + country.languages[language];
            }
            console.log("First Language: " + firstLanguage);
            // extract native name based in the first language in the list, when many languages are spoken in the country
            let nativeName = getNativeName(country, firstLanguage);
            //extract curreny List
            let currencyList = getCurrencyList(country);
            let bordercountries = getBorderCountriesButton(country);
            createElementAndAppend("h1", country.name.common, div1);
            createDetailRowAndAppend("Native Name:", nativeName, div2);
            createDetailRowAndAppend("Population:", `${country.population}`, div2);
            createDetailRowAndAppend("Region:", country.region, div2);
            createDetailRowAndAppend("Sub Region:", country.subregion, div2);
            createDetailRowAndAppend("Capital:", country.capital.join(","), div2);
            itemsContainer.appendChild(div2);
            createDetailRowAndAppend("Top Level Domain:", country.tld.join(","), div3);
            createDetailRowAndAppend("currencies:", currencyList, div3);
            createDetailRowAndAppend("Languages:", languageList, div3);
            itemsContainer.appendChild(div3);
            div1.append(itemsContainer);
            createElementAndAppend("strong", 'Border Countries:', div4);
            div4.appendChild(bordercountries);
            div1.appendChild(div4);
            div.appendChild(img); //append image
            div.appendChild(div1); //append details
            mainElement?.appendChild(div);
        }
    }
    else {
        console.log("Country code is null. Can't retrive the country details.");
    }
}
function getCountryObjFromCode(countryCode) {
    let allCountries = localStorage.getItem("countryList");
    let allCountriesArr = [];
    if (allCountries)
        allCountriesArr = JSON.parse(allCountries);
    let countryObj = allCountriesArr.find((country) => {
        if (country.cca3 === countryCode)
            return country;
    });
    return countryObj;
}
function getCountryName(countryCode) {
    let countryName = "";
    let countryObj = getCountryObjFromCode(countryCode);
    if (countryObj) {
        countryName = countryObj.name.common;
    }
    return countryName;
}
function getCurrencyList(country) {
    let currencyList = " ";
    for (let currency in country.currencies) {
        if (currencyList === " ") {
            currencyList = country.currencies[currency]?.name;
        }
        else
            currencyList = currencyList + ',' + country.currencies[currency]?.name;
    }
    return currencyList;
}
function getNativeName(country, firstLanguage) {
    let nativeName = "";
    if (country.name.nativeName[firstLanguage])
        nativeName = country.name.nativeName[firstLanguage]?.official;
    return nativeName;
}
function getBorderCountriesButton(country) {
    let bordercountries = document.createElement("div");
    bordercountries.classList = "border-countries";
    for (let border in country.borders) {
        let countryCode = country.borders[border];
        console.log("Country code:" + countryCode);
        let countryName = getCountryName(countryCode);
        let bordercountry = createElement("button", `${countryName}`);
        let button = bordercountry;
        if (countryCode)
            button.value = countryCode;
        bordercountries.appendChild(bordercountry);
    }
    bordercountries.addEventListener('click', (event) => {
        console.log(event.target);
        // fetchAndCreateCountryDetails(event.target.value);
        let bordercountry = event.target;
        if (bordercountry) {
            localStorage.setItem("countryCode", bordercountry.value);
        }
        handlePageRedirect(event);
    });
    return bordercountries;
}
//# sourceMappingURL=countrydetails.js.map