import PokeballImg from '../assets/pokeball.svg';
import PokeheartImg from '../assets/heart.svg';
import PokeballRandomizerImg from '../assets/qmark.png';
import '../index.css';
import { useEffect, useState } from 'react';
import { GetPokemonByNameOrId, GetRandomPokemon, GetSpeciesData, GetEvolutionChain, GetEvolutionArray, GetFlavorText, GetRandomFlavorText, GetLocationByID, GetAllAbilities, GetSpritesByName } from '../services/data';

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
    getRandomAbilities: (text: string) => void;
    getSprites: (arr: string[]) => void;
    getRandomSprites: (arr: string[]) => void;
}

const NavbarComponent = ({getPokemonData, getLocationData, getRandomData, getLocationForRandomData, getMovesArray, getRandomMovesArray, getFunFactoid, getRandomFactoids, getAllAbilities, getRandomAbilities, getSprites, getRandomSprites}: NavbarProps): JSX.Element => {

    const [pokemonVal, setPokemonVal] = useState<string>('');

    // this function will return pokemon data object, location string
    const handleSearch = async (searchVal: string) => {
        const pokemonData = await GetPokemonByNameOrId(searchVal);
        console.log(pokemonData);
        console.log(pokemonData.location_area_encounters);
        getPokemonData(pokemonData);
        const location = await GetLocationByID(pokemonData.id);
        getLocationData(location);
        // console.log(pokemonData.moves);
        getMovesArray(pokemonData.moves);
        const speciesData = await GetSpeciesData(pokemonData.name);
        const flavorText = await GetFlavorText(pokemonData.name);
        // console.log(flavorText);
        const randomFlavorText =  GetRandomFlavorText(flavorText);
        // console.log(randomFlavorText);
        getFunFactoid(randomFlavorText);
        const evolutionArray = await GetEvolutionArray(speciesData.evolution_chain.url);
        const sprites = GetSpritesByName(evolutionArray);
        console.log(sprites);
        getSprites(sprites);
        // console.log('EVOLUTION ARRAY');
        // console.log(evolutionArray);

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
        const abilities = await GetAllAbilities(randomPokemonData.name);
        getRandomAbilities(abilities.join(', '));
        const speciesData = await GetSpeciesData(randomPokemonData.name);
        const evolutionArray = await GetEvolutionArray(speciesData.evolution_chain.url);
        const sprites = GetSpritesByName(evolutionArray);
        console.log(sprites);
        getRandomSprites(sprites);
        return randomPokemonData.id;
    }

    const handleRandomLocation = async (id : number) => {
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
                    <button title='Favorites' type='button'>
                        <img className='h-9 w-9' src={PokeheartImg} alt="Favorites Icon" />
                    </button>
                    <button
                    className='w-max'
                    type='button'
                    title='Pokemon Randomizer'
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
                                    await handleSearch(pokemonVal.toLowerCase());
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