import styled from 'styled-components';
import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';
import useStore from '../hooks/useStore';

export const DetailAbout: React.FC<{
  pokemon: PokemonRootObject;
}> = ({ pokemon }) => {
  const pokemonTypeDetails = useStore<TypesPokemonRootObject | null>(
    state => state.pokemonTypeDetails
  );
  const pokemonSpeciesDetails = useStore<SpeciesPokemonRootObject | null>(
    state => state.pokemonSpeciesDetails
  );

  return (
    <Container>
      <Description>
        {pokemonSpeciesDetails?.flavor_text_entries?.[6].flavor_text}
      </Description>
      <Headline data-testid="about-headline" color={pokemon.types[0].type.name}>
        Pokédex Data
      </Headline>
      <InfoContainer>
        <Infobox data-testid="infobox">
          <p>Species</p>
          <p>
            <span>{pokemonSpeciesDetails?.genera[7].genus}</span>
          </p>
        </Infobox>
        <Infobox data-testid="infobox">
          <p>Height </p>
          <p>
            <span>{pokemon.height / 10}m </span>
          </p>
        </Infobox>
        <Infobox data-testid="infobox">
          <p>Weight </p>
          <p>
            <span>{pokemon.weight}kg</span>
          </p>
        </Infobox>
        <Infobox data-testid="infobox">
          <p>Abilities</p>
          <p>
            <span>
              {pokemon.abilities[0].ability.name} <br />
              {pokemon.abilities[1]?.ability.name}
            </span>
          </p>
        </Infobox>
        <Infobox data-testid="infobox">
          <p>Weaknesses</p>
          {pokemonTypeDetails?.damage_relations.double_damage_from?.map(
            type => (
              <SquareImage
                key={type.name}
                alt={type.name}
                src={`./images/square-${type.name}.svg`}
                data-testid="square-image"
              />
            )
          )}
        </Infobox>
        <Infobox data-testid="infobox">
          <p>Strength</p>
          {pokemonTypeDetails?.damage_relations.double_damage_to?.map(type => (
            <SquareImage
              data-testid="square-image"
              key={type.name}
              alt={type.name}
              src={`./images/square-${type.name}.svg`}
            />
          ))}
        </Infobox>
      </InfoContainer>
    </Container>
  );
};

export default DetailAbout;

const Container = styled.div`
  padding: 40px;
`;

const Headline = styled.h4`
  color: var(--font-color-${props => props.color});
`;

const Description = styled.p`
  color: var(--font-color-grey);
`;

const InfoContainer = styled.div`
  width: 280px;
  p {
    color: var(--font-color-black);
    font-size: 0.75rem;
    width: 100px;
  }

  span {
    align-items: flex-start;
    font-size: 0.9rem;
    color: var(--font-color-grey);
  }
`;

const Infobox = styled.div`
  display: flex;
`;

const SquareImage = styled.img`
  margin-right: 5px;
`;
