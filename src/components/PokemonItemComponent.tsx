import React from 'react';
import { GetPokemonByNameOrId } from '../services/data';

interface PokemonItemProps {
    pokemonName: string;
    spriteUrl: string;
    index: number;
    getPokemonFavoriteFromNavProp: () => void;
}

const PokemonItem = ({ pokemonName, index, getPokemonFavoriteFromNavProp, spriteUrl }: PokemonItemProps) => {

    return (
        <>
            <img className='hover:animate-bounce' src={spriteUrl} alt={`${pokemonName} sprite`} />
            <button
                className='brownFont quattroFont capitalize truncate hover:scale-150'
                onClick={getPokemonFavoriteFromNavProp}
                key={index}>
                {`${pokemonName}`}
            </button>
        </>
    )
}

export default PokemonItem;