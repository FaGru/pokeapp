import styled from 'styled-components';

import { RootObject } from '../interfaces/interfaces';

export const DetailAbout: React.FC<{ pokemon: RootObject }> = ({ pokemon }) => {
  return (
    <Container>
      <h3>Pokédex Data</h3>
      <InfoContainer>
        <Infobox>
          <p>Species</p>
          <p>{}</p>
        </Infobox>
        <Infobox>
          <p>Height </p>
          <p>{pokemon.height / 10}m</p>
        </Infobox>
        <Infobox>
          <p>Weight </p>
          <p>{pokemon.weight}kg</p>
        </Infobox>
        <Infobox>
          <p>Abilities</p>
          <p>{pokemon.abilities[0].ability.name}</p>
          <p>
            <span>{pokemon.abilities[1].ability.name}(hidden ability)</span>
          </p>
        </Infobox>
        <Infobox>
          <p>Weaknesses</p>
          <p>Weaknesses</p>
        </Infobox>
      </InfoContainer>
    </Container>
  );
};

export default DetailAbout;

const Container = styled.div`
  h3 {
    color: var(--card-color-grass);
  }
`;

const InfoContainer = styled.div``;

const Infobox = styled.div`
  display: flex;
`;
