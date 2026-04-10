export async function fetchCountries(){
    try{
    let countriesResonse= await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies");
    if(countriesResonse.ok){
        let countriesList= await countriesResonse.json();
        console.log(countriesList);
    }else{
        console.log("Failed to fetch the data.")
    }
}
catch(error :any){
    console.error(error);
}
