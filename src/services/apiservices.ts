export async function fetchCountries(){
    try{
    let countriesResonse= await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,region,flags");
    if(countriesResonse.ok){
        let countriesList= await countriesResonse.json();
        console.log(countriesList);
        console.log(typeof countriesList )
        return countriesList;
    }else{
        console.log("Failed to fetch the data.")
    }
}
catch(error :any){
    console.error(error);
}
}