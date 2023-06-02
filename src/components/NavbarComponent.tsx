import PokeballImg from '../assets/pokeball.svg';
import PokeheartImg from '../assets/heart.svg';
import PokeballRandomizerImg from '../assets/qmark.png';
import Close from '../assets/cross.svg';
import '../index.css';
import { useEffect, useState } from 'react';
import { GetFavorites, GetPokemonDataForFavorites } from '../services/data';
import PokemonItem from './PokemonItemComponent';

interface NavbarProps {
    getPokemonFromFavorite: (name: string) => void;
    getRandomPokemon: () => void;
    getSearchValue: (pokemonValue: string) => void;
    errMessage: boolean;
}

const NavbarComponent = ({ getSearchValue, getRandomPokemon, getPokemonFromFavorite, errMessage }: NavbarProps): JSX.Element => {

    const [pokemonVal, setPokemonVal] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<any>([]);
    const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
    const [inpuEntered, setInputEntered] = useState<boolean>(false);

    const handleClose = () => {
        setShow(!close);
    }

    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        let savedPokemon = GetFavorites();
        setFavorites(savedPokemon);
    }, [show])

    useEffect(() => {
        const FetchData = async () => {
            const getPokemonData = async (pokemonName: string) => {
                const data = await GetPokemonDataForFavorites(pokemonName);
                return data;
            }
            const FetchDataForFavorites = async () => {
                const favoritesData = await Promise.all(
                    favorites.map(async (pokemon: string) => {
                        const data = await getPokemonData(pokemon);
                        return data;
                    })
                );
                // console.log(favoritesData);
                setFavorites(favoritesData);
            }

            FetchDataForFavorites();
        }

        FetchData();
    }, [favorites]);

    return (
        <>
            {show &&
                <div className='drawer fadeIn rounded-md mt-5 h-80'>
                    <div className='grid grid-cols-1 justify-items-end'>
                        <button onClick={handleClose} className='m-5' type='button'>
                            <img className='h-9 w-auto' src={Close} alt="close icon" />
                        </button>
                    </div>
                    <div className='grid justify-items-center'>
                        <p className='lightBrownText text-3xl text-center mb-3.5'>Favorites</p>
                        <hr />
                    </div>
                    <div className='grid grid-cols-3 gap-1 mt-3 p-5 overflow-y-scroll h-96'>
                        {favorites.map((pokemon: any, index: number) => {
                            const pokeSprite: string = pokemon.sprites?.front_default;
                            return (
                                <div className='bottomBorder m-1 flex flex-col p-1 text-xs hover:animate-pulse' key={index}>
                                    {pokemon && (
                                        <>
                                            <PokemonItem
                                                pokemonName={`${pokemon.name}`}
                                                spriteUrl={pokeSprite}
                                                index={index}
                                                getPokemonFavoriteFromNavProp={() => getPokemonFromFavorite(pokemon.name)} />
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>}
            <div className="mt-5 flex justify-between">
                <div className='bgLightBrown h-32 w-24 py-2 grid justify-items-center rounded-e-md'>
                    <button onClick={() => {
                        handleShow();
                        setIsDisplayed(true);
                    }
                    } title='Favorites' type='button'>
                        <img className='h-9 w-9' src={PokeheartImg} alt="Favorites Icon" />
                    </button>
                    <p>Favorites</p>
                    <button
                        className='w-max'
                        type='button'
                        title='Pokemon Randomizer'
                        onClick={async () => {
                            getRandomPokemon();
                        }} >
                        <img className='h-9 w-9' src={PokeballRandomizerImg} alt="pokemon randomizer icon" />
                    </button>
                    <p>Random</p>
                </div>
                <div className='min-w-fit grid justify-items-center'>
                    <p className='brownFont text-6xl flex flex-row quattroFont'>P<img className='w-8 h-8 mt-4' src={PokeballImg} alt="pokeball" />kedex</p>
                    {errMessage ?
                     <div className='absolute top-24 text-red-600 animate-bounce'>Please enter valid name or id.</div>
                    :
                    null}
                    <div className='flex flex-col justify-center gap-2'>
                        <input
                            className='searchBar mt-11 mb-20 shadow-lg shadow-amber-700'
                            type="text"
                            placeholder={inpuEntered ? 'Press enter to search' : 'Search by name or id'}
                            onMouseEnter={() => setInputEntered(true)}
                            onMouseLeave={() => setInputEntered(false)}
                            onChange={(e) => {
                                setPokemonVal(e.target.value);
                            }}
                            onKeyDown={async e => {
                                if (e.key === 'Enter') {
                                    // console.log(pokemonVal);
                                    getSearchValue(pokemonVal.toLowerCase());
                                }
                            }}
                        />
                        <label htmlFor="search" hidden>search</label>
                    </div>
                </div>
                <div className='h-28 w-16'>

                </div>
            </div>

        </>
    )
}

export default NavbarComponent;