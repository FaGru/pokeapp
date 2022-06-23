import styled from 'styled-components';

import { PokemonRootObject } from '../interfaces/pokemon_interface';

import Pokecard from '../components/Pokecard';
import NavBar from '../components/NavBar';
import useStore from '../hooks/useStore';
import backendUseStore from '../hooks/backendUseStore';
import Searchbar from '../components/Searchbar';

const FavoritePage: React.FC = () => {
  const isSearchVisible = useStore<boolean>(state => state.isSearchVisible);
  const pokemonList = useStore<PokemonRootObject[]>(state => state.pokemonList);
  const { searchInput, filterSelect } = useStore(state => state);
  const { userData } = backendUseStore(state => state);
  let filteredPokemon = pokemonList.filter(
    pokemon =>
      pokemon.name.includes(searchInput.searchString) ||
      pokemon.id.toString() === searchInput.searchString
  );

  if (filterSelect.length > 0) {
    filteredPokemon = filteredPokemon.filter(pokemon =>
      filterSelect.includes(
        pokemon.types[0].type.name || pokemon.types[1]?.type.name
      )
    );
  }

  return (
    <>
      <NavBar />
      {isSearchVisible && <Searchbar />}
      {userData ? (
        <>
          <h3>Your favorite Pokemons</h3>
          <PokemonContainer>
            {filteredPokemon.map(pokemon => (
              <Pokecard
                key={pokemon.id}
                name={pokemon.name}
                number={pokemon.id}
                types={pokemon.types}
                image={pokemon.sprites.other.home.front_default}
                color={pokemon.types[0].type.name}
              />
            ))}
          </PokemonContainer>
        </>
      ) : (
        <LoginRequestMessage>
          Please login to add pokemons to your favorites.
        </LoginRequestMessage>
      )}
    </>
  );
};

export default FavoritePage;

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin: 110px 0 80px 0;
`;

const LoginRequestMessage = styled.p`
  text-align: center;
  margin-top: 100px;
`;
