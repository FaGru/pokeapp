import styled from 'styled-components';

import Pokecard from '../components/Pokecard';
import NavBar from '../components/NavBar';
import useStore from '../hooks/useStore';
import Searchbar from '../components/Searchbar';

export interface isSearchVisible {
  isSearchVisible: boolean;
}
const Home: React.FC = () => {
  const { searchInput, filterSelect, pokemonList, isSearchVisible } = useStore(
    state => state
  );

  //Filter for userinput -- name or id
  let filteredPokemon = pokemonList.filter(
    pokemon =>
      pokemon.name.includes(searchInput.searchString) ||
      pokemon.id.toString() === searchInput.searchString
  );

  //Type filter
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
      <PokemonContainer isSearchVisible={isSearchVisible}>
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
  );
};

export default Home;

const PokemonContainer = styled.div<isSearchVisible>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;

  margin-top: ${props => (props.isSearchVisible ? '40px' : '110px')};
  margin-bottom: 80px;
`;
