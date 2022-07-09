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
  const { userData, userFavoritesData } = backendUseStore(state => state);
  let filteredPokemonList: PokemonRootObject[] = [];

  if (userFavoritesData.length > 0) {
    filteredPokemonList = pokemonList.filter((pokemon: PokemonRootObject) =>
      userFavoritesData[0].favoritePokemonList.includes(pokemon.id)
    );

    filteredPokemonList = filteredPokemonList.filter(
      (pokemon: PokemonRootObject) =>
        pokemon.name.includes(searchInput.searchString) ||
        pokemon.id.toString() === searchInput.searchString
    );

    if (filterSelect.length > 0) {
      filteredPokemonList = filteredPokemonList.filter(
        (pokemon: PokemonRootObject) =>
          filterSelect.includes(
            pokemon.types[0].type.name || pokemon.types[1]?.type.name
          )
      );
    }
  }

  return (
    <>
      <NavBar />
      {isSearchVisible && <Searchbar />}
      <PageContainer>
        {userData && (
          <>
            <h3>Your favorite Pokemons</h3>
            <PokemonContainer>
              {filteredPokemonList.map(pokemon => (
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
        )}
        {!userData && (
          <RequestMessage>
            <p>Please login to add pokemons to your favorites.</p>
          </RequestMessage>
        )}
        {(userFavoritesData.length === 0 ||
          userFavoritesData[0]?.favoritePokemonList.length === 0) &&
          userData && (
            <RequestMessage>
              <p>Click on a Pokeball on the mainpage to like a Pokemon</p>
            </RequestMessage>
          )}
      </PageContainer>
    </>
  );
};

export default FavoritePage;

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const RequestMessage = styled.div`
  text-align: center;
  margin-top: 100px;
  box-shadow: 0 10px 28px 10px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 10px;
  width: 50%;
  margin: auto;
  padding: 2px;
  background-color: #f2f2f2;
`;
const PageContainer = styled.div`
  margin: 110px 0 40px 0;

  h3 {
    text-align: center;
  }
`;
