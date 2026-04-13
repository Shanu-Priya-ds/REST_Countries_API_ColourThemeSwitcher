export async function fetchCountries() {
    try {
        let countriesResonse = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,region,flags,cca3,nativeName");
        if (countriesResonse.ok) {
            let countriesList = await countriesResonse.json();
            console.log(countriesList);
            console.log(typeof countriesList);
            return countriesList;
        }
        else {
            console.log("Failed to fetch the data.");
        }
    }
    catch (error) {
        console.error(error);
    }
}
export async function fetchCountryByCode(countryCode) {
    console.log("Fench country details for country code : " + countryCode);
    try {
        let countriesResonse = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (countriesResonse.ok) {
            let country = await countriesResonse.json();
            console.log(country);
            return country;
        }
        else {
            console.log("Failed to fetch the data.");
        }
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=apiservices.js.map