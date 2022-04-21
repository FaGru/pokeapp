import styled from 'styled-components';
import { PokemonRootObject } from '../interfaces/pokemon_interface';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';
import useStore from '../hooks/useStore';

const DetailStats: React.FC<{
  pokemon: PokemonRootObject;
}> = ({ pokemon }) => {
  const pokemonTypeDetails = useStore<TypesPokemonRootObject | null>(
    state => state.pokemonTypeDetails
  );
  const pokemonSpeciesDetails = useStore<SpeciesPokemonRootObject | null>(
    state => state.pokemonSpeciesDetails
  );
  const activeDetailComponent = useStore<string>(
    state => state.activeDetailComponent
  );

  return (
    <>
      {activeDetailComponent === 'Stats' ? (
        <Container>
          <Headline color={pokemon.types[0].type.name}>Base Stats</Headline>
          <StatsContainer>
            <div>
              <TextBlack>HP</TextBlack>
              <TextBlack>Attack</TextBlack>
              <TextBlack>Defense</TextBlack>
              <TextBlack>Sp. Atk</TextBlack>
              <TextBlack>Sp. Def</TextBlack>
              <TextBlack>Speed</TextBlack>
              <TextBlack>Total</TextBlack>
            </div>
            <div>
              {pokemon.stats.map(stat => (
                <TextGrey key={stat.stat.name}>{stat.base_stat}</TextGrey>
              ))}
              <TextGrey>{}</TextGrey>
            </div>
            <StatBarContainer>
              {pokemon.stats.map(stat => (
                <StatBar
                  key={stat.stat.name}
                  color={pokemon.types[0].type.name}
                  property={String(stat.base_stat)}
                ></StatBar>
              ))}
            </StatBarContainer>
          </StatsContainer>
        </Container>
      ) : null}
    </>
  );
};

export default DetailStats;

const Container = styled.div`
  padding: 40px;
`;

const Headline = styled.h4`
  color: var(--font-color-${props => props.color});
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr 1fr;

  div {
    margin-right: 20px;
  }
`;

const StatBarContainer = styled.div`
  grid-column: 3 / 4;
  display: grid;
  grid-template-rows: 35px 35px 35px 35px 35px 35px 35px;
`;

const StatBar = styled.div`
  background-color: var(--card-color-${props => props.color});
  width: ${props => props.property}px;
  height: 7px;
  border-radius: 5px;
  margin-top: 15px;
  align-self: center;
`;

const TextGrey = styled.p`
  color: var(--font-color-grey);
`;
const TextBlack = styled.p`
  color: var(--font-color-black);
  font-weight: 500;
`;
