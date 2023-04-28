import PokeballImg from '../assets/pokeball.svg';
import PokeheartImg from '../assets/heart.svg';
import PokeballRandomizerImg from '../assets/qmark.png';
import '../index.css';
import { useEffect, useState } from 'react';
import { GetPokemonByNameOrId, GetRandomPokemon, GetSpeciesData, GetEvolutionChain, GetEvolutionArray, GetFlavorText, GetRandomFlavorText, GetLocationByID, GetAllAbilities } from '../services/data';

interface NavbarProps {
    getPokemonData: (data: any) => void;
    getLocationData: (locationName: string) => void;
    getLocationForRandomData: (rndLocationName: string) => void;
    getRandomData: (data: any) => void;
    getMovesArray: (arr: Array<any>) => void;
    getRandomMovesArray: (arr: any[]) => void;
    getFunFactoid: (text: string) => void;
    getRandomFactoids: (text: string) => void;
    getAllAbilities: (text: string) => void;
}

const NavbarComponent = ({getPokemonData, getLocationData, getRandomData, getLocationForRandomData, getMovesArray, getRandomMovesArray, getFunFactoid, getRandomFactoids, getAllAbilities}: NavbarProps): JSX.Element => {

    const [pokemonVal, setPokemonVal] = useState<string>('');

    // this function will return pokemon data object, location string
    const handleSearch = async (searchVal: string) => {
        const pokemonData = await GetPokemonByNameOrId(searchVal);
        console.log(pokemonData);
        console.log(pokemonData.location_area_encounters);
        getPokemonData(pokemonData);
        // const encounter = await GetEncounterURL(pokemonData.location_area_encounters);
        // const location = await GetLocationName(encounter);
        const location = await GetLocationByID(pokemonData.id);
        getLocationData(location);
        // console.log(pokemonData.moves);
        getMovesArray(pokemonData.moves);
        // const getByName = await GetLocationByName(pokemonData.name)
        // console.log(getByName);
        const speciesData = await GetSpeciesData(pokemonData.name);
        const flavorText = await GetFlavorText(pokemonData.name);
        // console.log(flavorText);
        const randomFlavorText =  GetRandomFlavorText(flavorText);
        // console.log(randomFlavorText);
        getFunFactoid(randomFlavorText);
        // console.log(flavorText.flavor_text_entries.filter((item:any) => {
        //     if(item.language.name === 'en'){
        //         console.log(item.flavor_text)
        //     }
        // }));
        // console.log(speciesData.evolution_chain.url);
        const evolutionData = await GetEvolutionChain(speciesData.evolution_chain.url);
        // const evolutionArray = await GetAllEvolutionNames(speciesData.evolution_chain.url);
        // console.log(evolutionArray);
        const evolutionArray = await GetEvolutionArray(speciesData.evolution_chain.url);
        // console.log('EVOLUTION ARRAY');
        // console.log(evolutionArray);
        
        // console.log(evolutionData.chain.species.name);
        // console.log(evolutionData.chain.evolves_to.map((item: any) => console.log(item.species.name)))
        // console.log(evolutionData.chain)
        // console.log(evolutionData.chain.evolves_to[0].evolves_to[0].species.name)

        const abilities = await GetAllAbilities(searchVal);
        console.log(abilities.join(', '));
        getAllAbilities(abilities.join(', '));
    }

    const handleRandomPokemon = async () => {
        const randomPokemonData = await GetRandomPokemon();
        // console.log('Random DATA IN NAVBAR COMPONENT');
        // console.log(randomPokemonData);
        getRandomData(randomPokemonData);
        getRandomMovesArray(randomPokemonData.moves);
        const flavorText = await GetFlavorText(randomPokemonData.name);
        const randomText = GetRandomFlavorText(flavorText);
        getRandomFactoids(randomText);
        return randomPokemonData.id;
        // const encounterForRndData = await GetEncounterURL(randomPokemonData.location_area_encounters);
        // const locationForRndData = await GetLocationName(encounterForRndData);
        // getLocationForRandomData(locationForRndData); 
    }

    const handleRandomLocation = async (id : number) => {
        // const encounter = await GetEncounterURL(url);
        // const location = await GetLocationName(encounter);
        const location = await GetLocationByID(id)
        getLocationForRandomData(location);
    }

    // useEffect(() => {
    //     console.log('Hello');
    // }, []);

    return (
        <>
            <div className="mt-5 flex justify-between">
                <div className='bgLightBrown h-28 w-16 grid justify-items-center rounded-e-md'>
                    <button type='button'>
                        <img className='h-9 w-9' src={PokeheartImg} alt="Favorites Icon" />
                    </button>
                    <button
                    className='w-max'
                    type='button'
                    onClick={async () => {
                        await handleRandomPokemon();
                        let id = await handleRandomPokemon();
                        // console.log('Random URL WORKED IN ONCLICK: ', rndUrl);
                        await handleRandomLocation(id);
                    }} >
                        <img className='h-9 w-9' src={PokeballRandomizerImg} alt="pokemon randomizer icon" />
                    </button>
                </div>
                <div className='min-w-fit grid justify-items-center'>
                    <p className='brownFont text-6xl flex flex-row quattroFont'>P<img className='w-8 h-8 mt-4' src={PokeballImg} alt="pokeball" />kedex</p>
                    <div className='flex justify-center gap-2'>
                        <input
                            className='searchBar mt-11 mb-20 shadow-lg shadow-amber-700'
                            type="text"
                            placeholder='Search...'
                            onChange={(e) => { setPokemonVal(e.target.value) }}
                            onKeyDown={async e => {
                                if(e.key === 'Enter'){
                                    // console.log('Enter pressed!!');
                                    // console.log(pokemonVal);
                                    await handleSearch(pokemonVal);
                                }
                            }}      
                        />
                        <label htmlFor="search" hidden>search</label>
                        {/* <button className='self-end'>search</button> */}
                    </div>
                </div>
                <div className='h-28 w-16'>

                </div>
            </div>
          
        </>
    )
}

export default NavbarComponent;