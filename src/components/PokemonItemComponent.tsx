interface PokemonItemProps {
    pokemonName: string;
    spriteUrl: string;
    index: number;
    getPokemonFavoriteFromNavProp: () => void;
}

const PokemonItem = ({ pokemonName, index, getPokemonFavoriteFromNavProp, spriteUrl }: PokemonItemProps): JSX.Element => {

    return (
        <>
            <img src={spriteUrl} alt={`${pokemonName} sprite`} />
            <button
                className='brownFont text-center quattroFont capitalize truncate hover:scale-125'
                onClick={getPokemonFavoriteFromNavProp}
                key={index}>
                {`${pokemonName}`}
            </button>
        </>
    )
}

export default PokemonItem;