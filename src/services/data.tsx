const GetPokemonByNameOrId = async (input: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}/`);
    const data = await response.json();
    // console.log(data);
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

const GetAllAbilities = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    let abilitiesArr: string[] = [];
    // console.log(data.abilities);
    data.abilities.map((item: any) => {
        abilitiesArr.push(FormatAndCapitalize(item.ability.name));
    })
    return abilitiesArr.join(', ');
}

const GetAllMoves = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    let movesArray: string[] = [];
    data.moves.map((item: any) => {
        movesArray.push(FormatAndCapitalize(item.move.name))
    })
    return movesArray.join(', ');
}

const GetLocationByID = async (id: string | number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/location/${id}/`);
    const data = await response.json();
    // console.log(FormatAndCapitalize(data.name));
    return FormatAndCapitalize(data.name);
}

// GetLocationByID(6);

const GetSpritesByName = async (arr: string[]) => {
    let urlArr: string[] = [];
    arr.map(async (pokemon: string) => {
        let data = await GetPokemonByNameOrId(pokemon);
        // console.log(data.sprites.other.dream_world.front_default);
        urlArr.push(data.sprites.other.dream_world.front_default);
    });
    return urlArr;
}

// this function will return an array of all flavor text
const GetFlavorText = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
    const data = await response.json();
    // console.log('LOCATION DATA HOPEFULLY HAS FLAVOR TEXT!');
    // console.log(data);
    let textArr: string[] = [];
    data.flavor_text_entries.filter((item: any) => {
        if (item.language.name === 'en') {
            textArr.push(item.flavor_text);
        }
    });
    // console.log(textArr);
    let randomText = Math.floor(Math.random() * textArr.length);
    // console.log(textArr[randomText]);
    return textArr[randomText];
}

// this function will get a random number between 0 and arr.length and return the value of the randomIndex value
const GetRandomFlavorText = (arr: string[]) => {
    let randomIndex = Math.floor(Math.random() * arr.length) + 1;
    return arr[randomIndex];
}

const GetSpeciesData = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
    const data = await response.json();
    // console.log(data);
    return data;
}

const GetEvolutionChain = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
}

const GetEvolutionArray = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log('EVOLUTION ARRAY');
    // console.log(data.chain.species.name);
    let evolutionArr: string[] = [data.chain.species.name];
    if (data.chain.evolves_to.length !== 0) {
        // console.log(data.chain.evolves_to[0].species.name);
        data.chain.evolves_to.map((item: any) => {
            // console.log(item.species.name);
            evolutionArr.push(item.species.name);
        })
        if (data.chain.evolves_to[0].evolves_to.length !== 0) {
            // console.log(data.chain.evolves_to[0].evolves_to[0].species.name);
            evolutionArr.push(data.chain.evolves_to[0].evolves_to[0].species.name);
        }
    }
    // console.log(evolutionArr);
    return evolutionArr;
}

const SavePokemonToFavorites = (pokemon: string) => {
    let favorites = GetFavorites();
    if (!favorites.includes(pokemon)) {
        favorites.push(pokemon);
        // console.log(favorites);
        localStorage.setItem('Favorites', JSON.stringify(favorites));
    }
}

const RemovePokemonFromFavorites = (pokemon: string) => {
    let favorites = GetFavorites();
    let pokemonIndex = favorites.indexOf(pokemon);
    if (pokemonIndex !== -1) {
        favorites.splice(pokemonIndex, 1);
        // console.log(favorites);
        localStorage.setItem('Favorites', JSON.stringify(favorites));
    }
}

const GetFavorites = () => {
    let pokemonStorage = localStorage.getItem('Favorites');
    try {
        if (pokemonStorage === null) {
          return [];
        }
        const favorites = JSON.parse(pokemonStorage);
        if (!Array.isArray(favorites)) {
          return [];
        }
        return favorites;
      } catch (error) {
        console.error('Error parsing favorites:', error);
        return [];
      }
}

const CheckIfPokemonIsSaved = (pokemon: string): boolean => {
    let favorites = GetFavorites();
    // console.log(favorites);
    return favorites.includes(pokemon);
}

const DetermineFontColor = (type: string) => {
    let textColor: string = '';
    switch (type) {
        case 'normal':
            textColor = 'self-center normalType';
            break;
        case 'fire':
            textColor = 'self-center fireType';
            break;
        case 'water':
            textColor = 'self-center waterType';
            break;
        case 'electric':
            textColor = 'self-center electricType';
            break;
        case 'grass':
            textColor = 'self-center grassType';
            break;
        case 'ice':
            textColor = 'self-center iceType';
            break;
        case 'fighting':
            textColor = 'self-center fightingType';
            break;
        case 'poison':
            textColor = 'self-center poisonType';
            break;
        case 'ground':
            textColor = 'self-center groundType';
            break;
        case 'flying':
            textColor = 'self-center flyingType';
            break;
        case 'psychic':
            textColor = 'self-center psychicType';
            break;
        case 'bug':
            textColor = 'self-center bugType';
            break;
        case 'rock':
            textColor = 'self-center rockType';
            break;
        case 'ghost':
            textColor = 'self-center ghostType';
            break;
        case 'dragon':
            textColor = 'self-center dragonType';
            break;
        case 'dark':
            textColor = 'self-center darkType';
            break;
        case 'steel':
            textColor = 'self-center steelType';
            break;
        case 'fairy':
            textColor = 'self-center fairyType';
            break;
    }
    return textColor;
}

const FormatAndCapitalize = (words: string) => {
    // console.log(words);
    let formattedStr: string;
    if (words.includes('-')) {
        formattedStr = words.split('-').map((word: string) => {
            return `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`;
        }).join(' ');
        // console.log(formattedStr);
    } else {
        formattedStr = `${words.charAt(0).toUpperCase()}${words.substring(1).toLowerCase()}`;
        // console.log(formattedStr);
    }
    return formattedStr;
}

export { GetPokemonByNameOrId, GetRandomPokemon, GetSpeciesData, GetEvolutionChain, GetEvolutionArray, FormatAndCapitalize, GetFlavorText, GetRandomFlavorText, GetLocationByID, GetSpritesByName, GetAllAbilities, DetermineFontColor, SavePokemonToFavorites, RemovePokemonFromFavorites, CheckIfPokemonIsSaved, GetFavorites, GetAllMoves };  