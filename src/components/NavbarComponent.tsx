import PokeballImg from '../assets/pokeball.svg';
import PokeheartImg from '../assets/heart.svg';
import PokeballRandomizerImg from '../assets/qmark.png';
import '../index.css';
import { useEffect, useState } from 'react';
import { GetPokemonByNameOrId, GetEncounterURL, GetLocationName, GetRandomPokemon, GetSpeciesData, GetEvolutionChain } from '../services/data';

interface NavbarProps {
    getPokemonData: (data: object) => void;
    getLocationData: (locationName: string) => void;
    getLocationForRandomData: (rndLocationName: string) => void;
    getRandomData: (data: object) => void;
    getMovesArray: (arr: Array<any>) => void;
}

const NavbarComponent = ({getPokemonData, getLocationData, getRandomData, getLocationForRandomData, getMovesArray}: NavbarProps): JSX.Element => {

    const [pokemonVal, setPokemonVal] = useState<string>('');

    // this function will return pokemon data object, location string
    const handleSearch = async (searchVal: string) => {
        const pokemonData = await GetPokemonByNameOrId(searchVal);
        // console.log(pokemonData);
        getPokemonData(pokemonData);
        const encounter = await GetEncounterURL(pokemonData.location_area_encounters);
        const location = await GetLocationName(encounter);
        getLocationData(location);
        console.log(pokemonData.moves);
        getMovesArray(pokemonData.moves);
        const speciesData = await GetSpeciesData(pokemonData.name);
        console.log(speciesData.evolution_chain.url);
        const evolutionData = await GetEvolutionChain(speciesData.evolution_chain.url);
        console.log(evolutionData);
    }

    const handleRandomPokemon = async () => {
        const randomPokemonData = await GetRandomPokemon();
        // console.log('Random DATA IN NAVBAR COMPONENT');
        // console.log(randomPokemonData);
        getRandomData(randomPokemonData);
        return randomPokemonData.location_area_encounters;
        // const encounterForRndData = await GetEncounterURL(randomPokemonData.location_area_encounters);
        // const locationForRndData = await GetLocationName(encounterForRndData);
        // getLocationForRandomData(locationForRndData); 
    }

    const handleRandomLocation = async (url : string) => {
        const encounter = await GetEncounterURL(url);
        const location = await GetLocationName(encounter);
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
                        let rndUrl = await handleRandomPokemon();
                        // console.log('Random URL WORKED IN ONCLICK: ', rndUrl);
                        await handleRandomLocation(rndUrl);
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