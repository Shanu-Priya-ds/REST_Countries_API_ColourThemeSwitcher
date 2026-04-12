import { handlePageRedirect } from "../main.js";
import type { Country } from "../models/country.js";
import { fetchCountryByCode } from "../services/apiservices.js";
import { createDetailRowAndAppend, createElement, createElementAndAppend } from "../utils/domUtils.js";

/**
 * need to refactor
 */
export async function fetchAndCreateCountryDetails(countryCode: string | null | undefined, mainElement: HTMLElement | null) {
    if (countryCode != null) {
        // mainElement.innerHTML = "";
        let countriesList: Country[] = await fetchCountryByCode(countryCode);
        let country: Country | undefined = countriesList[0];
        console.log(country);
        // console.log(country[0]);
        //create DOM elements
        if (country) {
            let div = document.createElement("div");
            div.className = "country-details-container";

            let img = document.createElement("img");
            img.src = country.flags.svg;
            img.alt = country.flags.alt;
            let languageList: string | undefined = " ";
            let firstLanguage = "";
            for (let language in country.languages) {
                if (firstLanguage == "" && language != "en")
                    firstLanguage = language;
                if (languageList === " ")
                    languageList = country.languages[language];
                else
                    languageList = languageList + "," + country.languages[language];
            } console.log(firstLanguage);

            let div1 = document.createElement("div");
            div1.className = "country-details";

            createElementAndAppend("h2", country.name.common, div1);

            console.log(country.name.nativeName[firstLanguage]);

            let nativeName: string | undefined = "";
            if (country.name.nativeName[firstLanguage]) nativeName = country.name.nativeName[firstLanguage]?.official;
             let currencyList: string | undefined = " ";

            for (let currency in country.currencies) {
                if (currencyList === " ") {
                    currencyList = country.currencies[currency]?.name;
                } else
                    currencyList = currencyList + ',' + country.currencies[currency]?.name;
            }

            createDetailRowAndAppend("Native Name:", nativeName, div1);
            createDetailRowAndAppend("Population:", `{country.population}`, div1);
            createDetailRowAndAppend("Region:", country.region, div1);
            createDetailRowAndAppend("Sub Region:", country.subregion, div1);
            createDetailRowAndAppend("Capital:", country.capital.join(","), div1);
            createDetailRowAndAppend("Top Level Domain:", country.tld.join(","), div1);
            createDetailRowAndAppend("currencies:", currencyList, div1);
            createDetailRowAndAppend("Languages:", languageList, div1);

            let bordercountries = createElement("div", `Border Countries:`);

            for (let border in country.borders) {
                let countryCode = country.borders[border];
                console.log(countryCode);
                // let countryObj = allCountriesArr.find((country) => {
                //     if (country.cca3 === countryCode)
                //         return country;
                // });
                //   console.log(countryObj?.name.common)
                let countryName = getCountryName(countryCode);
                let bordercountry = createElement("button", `${countryName}`);
                let button = bordercountry as HTMLButtonElement;
                if (countryCode) button.value = countryCode;
                bordercountries.appendChild(bordercountry);
            }
            bordercountries.addEventListener('click', (event) => {
                console.log(event.target);
                // fetchAndCreateCountryDetails(event.target.value);
                let bordercountry = event.target as HTMLButtonElement;
                if (bordercountry) {
                    localStorage.setItem("countryCode", bordercountry.value);
                }
                handlePageRedirect(event);
            });
            div1.appendChild(bordercountries);

            div.appendChild(img);//append image
            div.appendChild(div1);//append details
            mainElement?.appendChild(div);
            // div.appendChild();//append border countries
        }
    } else {
        //country code 
    }
}

function getCountryObjFromCode(countryCode: string | undefined) {
    let allCountries = localStorage.getItem("countryList");
    let allCountriesArr: Country[] = [];
    if (allCountries)
        allCountriesArr = JSON.parse(allCountries)
    console.log(allCountries);
    let countryObj = allCountriesArr.find((country) => {
        if (country.cca3 === countryCode)
            return country;
    });
    return countryObj;
}

function getCountryName(countryCode: string | undefined) {
    let countryName = "";
    let countryObj = getCountryObjFromCode(countryCode);
    if (countryObj) {
        countryName = countryObj.name.common
    }
    return countryName;
}