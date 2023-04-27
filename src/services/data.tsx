const GetPokemonByNameOrId = async (input: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`);
    const data = await response.json();
    console.log(data);
    return data;
}

// this function will generate a random number based on total lenght of pokemon array to retrieve random pokemon data
const GetRandomPokemon = async (): Promise<any> => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=648`');
    const data = await response.json();
    // console.log(data);
    let randomIndex = Math.floor(Math.random() * data.results.length) + 1;
    let randomPokemon = data.results[randomIndex].name;
    const rndPokemonData = await GetPokemonByNameOrId(randomPokemon);
    // console.log('Random pokemon retrieved below:');
    // console.log(rndPokemonData);
    return rndPokemonData;
}

GetRandomPokemon();

// this function will use location encounter url to pinpoint location name
const GetEncounterURL = async (encounterURL: string) => {
    const response = await fetch(encounterURL);
    const data = await response.json();
    // console.log('Data from EncounterURL Function!!');
    // console.log(data)
    // console.log(typeof data[0].location_area.url);
    return data[0].location_area.url;
}
// GetPokemonLocationAreaURL("https://pokeapi.co/api/v2/pokemon/26/encounters");

// this function wil use location area url from GetPokemonLocationAreaURL() function and return location name
const GetLocationName = async (locationURL: string) => {
    const response = await fetch(locationURL);
    const data = await response.json();
    // console.log(data.names[0].name);
    let location:string;
    // if(!data.names[0].name) location = data.names[0].name;
    // else location = 'Location Unknown';
    data.names[0].name ? location = data.names[0].name : location = 'Location Unknow';
    // console.log('Here is location: ', location)
    return location;
}

const GetSpeciesData = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
    const data = await response.json();
    console.log(data);
    return data;
}

const GetEvolutionChain = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

// GetLocationName('https://pokeapi.co/api/v2/location-area/323/');
const FormatAndCapitalize = () => {

}

export {GetPokemonByNameOrId, GetEncounterURL, GetLocationName, GetRandomPokemon, GetSpeciesData, GetEvolutionChain};