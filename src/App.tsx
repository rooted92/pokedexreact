import './App.css';
import { useEffect, useState } from 'react';
import NavbarComponent from './components/NavbarComponent';
// import Pikachu from './assets/pikachu.svg';
import Pawprints from './assets/pawprints.svg';
import Heart from './assets/heart.svg';
import HeartOutline from './assets/heartOutline.svg';
import Quotes from './assets/quotes.svg';
import Bracelet from './assets/bracelet.svg';
import Pikachu from './assets/pikachu.svg';
import { GetRandomPokemon, GetPokemonByNameOrId, FormatAndCapitalize } from './services/data';



const App = () => {
  const [pokemonData, setPokemonData] = useState<any | null>({});
  const [pokemonName, setPokemonName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [randomPokemon, setRandomPokemon] = useState<any>({});
  // const [isSearched, setIsSearched] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [movesArray, setMovesArray] = useState<string>('');
  const [funFactoids, setFunFactoids] = useState<string>('');
  const [abilities, setAbilities] = useState<string>('');



  const handlePokemonData = async (data: any) => {
    setPokemonData(data);
    setPokemonName(data.name);
    setType(data?.types?.[0]?.type?.name);
  }

  const handleLocation = async (url: string) => {
    setLocation(url);
  }

  const handleRandomPokemonGenerator = async (data: any) => {
    setPokemonData(data);
    setPokemonName(data.name);
    setType(data?.types?.[0]?.type?.name);
  }

  const handleLocationForRandomPokemon = (url: string) => {
    setLocation(url);
  }

  const handleMovesArray = (movesArr: Array<any>) => {
    // console.log('Moves Array Right Here vvv');
    let movesArray: Array<string> = movesArr.map(moves => {
      return FormatAndCapitalize(moves.move.name);
    });
    // console.log(movesArray.join(', '));
    // console.log(movesArray);
    setMovesArray(movesArray.join(', '));
    // console.log(movesArr.map(moves => {
    //   return moves.move.name
    // }));    
  }

  const handleRandomMovesArray = (movesArr: any[]) => {
    let movesArray: string[] = movesArr.map(moves => {
      return FormatAndCapitalize(moves.move.name);
    })
    setMovesArray(movesArray.join(', '));
  }

  const handleFunFactoid = (text: string) => {
    setFunFactoids(text);
  }

  const handleRandomFactoids = (text: string) => {
    setFunFactoids(text);
  }

  const handleAbilities = (text: string) => {
    setAbilities(text);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('pokemonData');
    const parsedData = storedData ? JSON.parse(storedData) : null;
    setPokemonData(parsedData);
  }, []);

  // console.log(pokemonData);
  useEffect(() => {
    // console.log(pokemonData);
    localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
  }, [pokemonData]);

  useEffect(() => {
    const GetBlastoise = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/9/encounters');
      const data = await response.json();
      console.log(data);
    }
    GetBlastoise();
  }, [])

  return (
    <>
      <NavbarComponent
        getPokemonData={handlePokemonData}
        getLocationData={handleLocation}
        getRandomData={handleRandomPokemonGenerator}
        getLocationForRandomData={handleLocationForRandomPokemon}
        getMovesArray={handleMovesArray}
        getRandomMovesArray={handleRandomMovesArray}
        getFunFactoid={handleFunFactoid} 
        getRandomFactoids={handleRandomFactoids}
        getAllAbilities={handleAbilities} />
      <div className="grid grid-cols-3 mx-32 xl:gap-20 lg:gap-16 items-start mb-8">
        {/* First columns */}
        <div>
          <div className='grid grid-cols-2 mb-5'>
            <p className='italic headers'>{FormatAndCapitalize(pokemonName)}</p>
            <p className='text-end font-bold headers'>{pokemonData.id}</p>
          </div>
          <div className='flex flex-col justify-center'>
            <img className='h-60 w-auto' src={pokemonData?.sprites?.other?.dream_world?.front_default} alt="temp-img" />

          </div>
          <div className='grid grid-cols-7 mt-5 gap-4'>
            <p className='self-center'>{FormatAndCapitalize(type)}</p>
            <p className='text-center col-span-5 darkBrownText self-center text-ellipsis'><img className='inline h-9 w-auto' src={Bracelet} alt="location icon" /> {location}</p>
            <button type='button' className='flex justify-end'>
              <img className='h-9 w-auto items-end' src={HeartOutline} alt="Favorites Icon" />
            </button>
          </div>
        </div>
        {/* Second Column */}
        <div className=''>
          <p className='headers'>Evolutions</p>
          <div className='grid grid-cols-6 mt-7'>
            <img className='col-span-1 h-12 w-auto flex justify-end self-center' src={Pawprints} alt="Footprints" />
            <div className='flex col-span-5 overflow-x-scroll gap-9 ml-9 pb-1'>
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
              <img className='max-h-20 w-auto' src={Pikachu} alt="sprite" />
            </div>
          </div>
          <p className='headers mt-6 row-span-6'>Moves</p>
          <p className='overflow-auto h-32'>{movesArray}</p>
        </div>
        {/* Third Column */}
        <div className=''>
          <img src="" alt="" />
          <p className='headers'><img className='inline h-9 w-auto mr-2' src={Quotes} alt="quotes icon" />Fun Factoids</p>
          <p className='mt-7'>{funFactoids}</p>
          <p className='headers mt-6'>Abilities</p>
          <p>{abilities}</p>
        </div>
      </div>
    </>
  );
}

export default App;
