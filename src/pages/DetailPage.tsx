import DetailHeader from '../components/DetailHeader';
import DetailAbout from '../components/DetailAbout';

import styled from 'styled-components';

import { PokemonRootObject } from '../interfaces/interfaces';

const DetailPage: React.FC<{ pokemon: PokemonRootObject }> = ({ pokemon }) => {
  return (
    <DetailPageContainer>
      <DetailHeader pokemon={pokemon} />
      <DetailAbout pokemon={pokemon} />

      {/* <p>Pokedex-ID: {pokemon.id}</p>
        <h2>{pokemon.name}</h2>
        <div>
          Types:
          {pokemon.types.map((types: Type) => (
            <p key={nanoid()}>{types.type?.name}</p>
          ))}
        </div>
        {pokemon.abilities.map(ability => (
          <p>{ability.ability.name}</p>
        ))} */}
    </DetailPageContainer>
  );
};
export default DetailPage;

const DetailPageContainer = styled.div``;
