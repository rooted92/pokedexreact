
import { useEffect, useState } from 'react';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/FooterComponent';
import Pawprints from './assets/pawprints.svg';
import Heart from './assets/heart.svg';
import HeartOutline from './assets/heartOutline.svg';
import Location from './assets/location.svg';
import Brain from './assets/brain.svg';
import Pikachu from './assets/pikachu.svg';
import SnorlaxAvatar from './assets/snorlaxError.svg';
import ErrorIcon from './assets/error-404.svg';
import { FormatAndCapitalize, DetermineFontColor, SavePokemonToFavorites, RemovePokemonFromFavorites, CheckIfPokemonIsSaved, GetFavorites, GetPokemonByNameOrId, GetLocationByID, GetSpritesByName, GetSpeciesData, GetEvolutionArray, GetAllMoves, GetAllAbilities, GetFlavorText, GetRandomPokemon } from './services/data';



const App = () => {
  const [pokemonData, setPokemonData] = useState<any | null>({});
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [pokemonImg, setPokemonImg] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [typeClass, setTypeClass] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [movesArray, setMovesArray] = useState<string>('');
  const [funFactoids, setFunFactoids] = useState<string>('');
  const [abilities, setAbilities] = useState<string>('');
  const [sprites, setSprites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [userError, setUserError] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const handleSearchValue = async (pokemonValue: string) => {
    // setIsLoading(true);
    setSearchValue(pokemonValue);
    // console.log(pokemonValue);
    let data = await GetPokemonByNameOrId(pokemonValue);
    console.log(data);
    if (!data) {
      setUserError(true);
      return;
    } else if (data === 'Not Found') {
      console.log(data);
      setIsNotFound(true);
    }
    else {
      setUserError(false);
    }
    setIsLoading(true);
    setPokemonName(data.name);
    setPokemonId(data.id);
    setPokemonImg(data.sprites?.other.dream_world.front_default);
    setType(data.types[0].type.name);
    let fontColor = DetermineFontColor(data.types[0].type.name);
    setTypeClass(fontColor);
    setLocation(await GetLocationByID(data.id));
    let speciesData = await GetSpeciesData(data.name);
    let evolutionArr = await GetEvolutionArray(speciesData.evolution_chain.url);
    let evolutionSprites = await GetSpritesByName(evolutionArr);
    // console.log(evolutionSprites);
    setSprites(evolutionSprites);
    // console.log(sprites);
    // console.log(evolutionArr);
    // console.log(speciesData);
    setMovesArray(await GetAllMoves(data.name));
    setAbilities(await GetAllAbilities(data.name));
    setFunFactoids(await GetFlavorText(data.name));
    setIsLoading(false);
  }

  const handleRandomPokemon = async () => {
    setIsLoading(true);
    let data = await GetRandomPokemon();
    // console.log(data);
    setPokemonName(data.name);
    setPokemonId(data.id);
    setPokemonImg(data.sprites?.other.dream_world.front_default);
    setType(data.types[0].type.name);
    let fontColor = DetermineFontColor(data.types[0].type.name);
    setTypeClass(fontColor);
    setLocation(await GetLocationByID(data.id));
    let speciesData = await GetSpeciesData(data.name);
    let evolutionArr = await GetEvolutionArray(speciesData.evolution_chain.url);
    let evolutionSprites = await GetSpritesByName(evolutionArr);
    // console.log(evolutionSprites);
    setSprites(evolutionSprites);
    // console.log(sprites);
    // console.log(evolutionArr);
    // console.log(speciesData);
    setMovesArray(await GetAllMoves(data.name));
    setAbilities(await GetAllAbilities(data.name));
    setFunFactoids(await GetFlavorText(data.name));
    setIsLoading(false);
  }

  useEffect(() => {
    handleRandomPokemon();
  }, []);

  const handleAddToFavorites = () => {
    SavePokemonToFavorites(pokemonName);
  }

  const handleRemoveFromFavorites = () => {
    RemovePokemonFromFavorites(pokemonName);
  }

  useEffect(() => {
    if (isSaved) {
      handleAddToFavorites();
    } else {
      handleRemoveFromFavorites();
    }
  }, [isSaved]);

  useEffect(() => {
    let favorited = CheckIfPokemonIsSaved(pokemonName);
    if (favorited) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [pokemonName]);

  return (
    <>
      <div className='pageContainer'>
        <NavbarComponent
          getPokemonFromFavorite={handleSearchValue}
          getRandomPokemon={handleRandomPokemon}
          getSearchValue={handleSearchValue}
          errMessage={userError} />
        <div className="mainContent container mx-0 px-0 sm:mx-auto">

          {
            isLoading
              ? (<div className='grid grid-cols-1 justify-items-center'>
                <div className='flex flex-row animate-pulse'>
                  <p className='tracking-wider self-end'>Loading</p>
                  <img className='mt-5 h-40 w-auto' src={Pikachu} alt="loading icon" />
                </div>
              </div>)
              : isNotFound ?
                <div className='grid grid-cols-1 justify-items-center'>
                  <div className='flex flex-row'>
                    <img className='mt-5 h-40 w-auto' src={ErrorIcon} alt="loading icon" />
                    <img className='mt-5 h-40 w-auto' src={SnorlaxAvatar} alt="loading icon" />
                    <p className='text text-rose-500 self-end'>Pokemon not found...</p>
                  </div>
                </div>
                :
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 mx-32 lg:gap-16 items-start mb-8">
                  {/* First columns */}
                  <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 mb-5'>
                      <p className='italic headers'>{FormatAndCapitalize(pokemonName)}</p>
                      <p className='text-end font-bold headers'>{pokemonId}</p>
                    </div>
                    <div className='flex justify-center'>
                      <img className='h-80 sm:h-60 w-auto fadeIn' src={pokemonImg} alt="temp-img" />
                    </div>
                    <div className='flex flex-col md:grid md:grid-cols-7 mt-5 md:gap-4'>
                      <p className={typeClass}>{FormatAndCapitalize(type)}</p>
                      <p className='text-center  space-x-4 md:col-span-5 darkBrownText self-center text-ellipsis'><img className='inline h-7 w-auto' src={Location} alt="location icon" /> {location}</p>
                      <button
                        type='button'
                        className='flex justify-center sm:justify-end'
                        onClick={() => setIsSaved(!isSaved)}>
                        <img
                          title='Add to Favorites'
                          className='h-5 sm:h-9 w-auto items-start sm:items-end hover:scale-125'
                          src={isSaved ? Heart : HeartOutline}
                          alt="Favorites Icon" />
                      </button>
                    </div>
                  </div>
                  {/* Second Column */}
                  <div className='mt-4 lg:mt-0'>
                    <p className='headers'>Evolutions</p>
                    <div className='grid grid-cols-6 mt-7'>
                      <img className='col-span-1 h-12 w-auto flex justify-end self-center' src={Pawprints} alt="Footprints" />
                      <div className='flex col-span-5 overflow-x-scroll gap-9 ml-9 pb-1'>
                        {
                          sprites.map((url: string, index: number) => {
                            // console.log(url, index);
                            return (
                              <>
                                <img key={index} className='max-h-20 w-auto' src={url} alt="pokemon sprite" />
                              </>
                            );
                          })
                        }
                      </div>
                    </div>
                    <p className='headers mt-6 row-span-6'>Moves</p>
                    <p className='overflow-auto h-32'>{movesArray}</p>
                  </div>
                  {/* Third Column */}
                  <div className='md:flex md:flex-col-reverse lg:grid lg:grid-cols-2 lg:col-span-2 xl:col-span-1 xl:flex xl:flex-col'>
                    <div className='mt-10 lg:mt-0 '>
                      <p className='headers'><img className='inline h-9 w-auto mr-2' src={Brain} alt="quotes icon" />Fun Factoids</p>
                      <p className='mt-7 lg:inline'>{funFactoids}</p>
                    </div>
                    <div className='w-3/4 lg:px-8 xl:px-0'>
                      <p className=' headers mt-6 lg:mt-0 xl:mt-10'>Abilities</p>
                      <p>{abilities}</p>
                    </div>
                  </div>
                </div>
          }
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
