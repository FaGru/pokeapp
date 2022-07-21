import styled from 'styled-components';
import { PokemonRootObject } from '../interfaces/pokemon_interface';
import useStore from '../hooks/useStore';

const DetailStats: React.FC<{
  pokemon: PokemonRootObject;
}> = ({ pokemon }) => {
  const activeDetailComponent = useStore<string>(
    state => state.activeDetailComponent
  );

  let totalStats: number = 0;
  pokemon.stats.map(stat => {
    totalStats += stat.base_stat;
  });
  return (
    <>
      {activeDetailComponent === 'Stats' ? (
        <Container>
          <Headline color={pokemon.types[0].type.name}>Base Stats</Headline>
          <StatsContainer>
            <div>
              <TextBlack data-testid="stat-name">HP</TextBlack>
              <TextBlack data-testid="stat-name">Attack</TextBlack>
              <TextBlack data-testid="stat-name">Defense</TextBlack>
              <TextBlack data-testid="stat-name">Sp. Atk</TextBlack>
              <TextBlack data-testid="stat-name">Sp. Def</TextBlack>
              <TextBlack data-testid="stat-name">Speed</TextBlack>
              <TextBlack data-testid="stat-name">Total</TextBlack>
            </div>
            <div>
              {pokemon.stats.map(stat => (
                <TextGrey key={stat.stat.name}>{stat.base_stat}</TextGrey>
              ))}
              <TextGreyBold>{totalStats}</TextGreyBold>
            </div>
            <StatBarContainer>
              {pokemon.stats.map(stat => (
                <StatBar
                  data-testid="stat-bar"
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
const TextGreyBold = styled.p`
  color: var(--font-color-grey);
  font-weight: 700;
`;
const TextBlack = styled.p`
  color: var(--font-color-black);
  font-weight: 500;
`;
