import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useState } from 'react';

import { RootObject, Type } from '../interfaces/interfaces';

const DetailPage: React.FC<{ pokemon: RootObject }> = ({ pokemon }) => {
  const navigate = useNavigate();
  const [isShiny, setIsShiny] = useState<boolean>(false);

  console.log('in Detail page', pokemon);

  return (
    <>
      <button onClick={() => navigate('/', { replace: true })}>back</button>
      <DetailContainer color={pokemon.types[0].type.name}>
        <p>Pokedex-ID: {pokemon.id}</p>
        <h2>{pokemon.name}</h2>
        <div>
          Types:
          {pokemon.types.map((types: Type) => (
            <p key={nanoid()}>{types.type?.name}</p>
          ))}
        </div>
        {pokemon.abilities.map(ability => (
          <p>{ability.ability.name}</p>
        ))}
        <ImageContainer onClick={() => setIsShiny(!isShiny)}>
          <img
            src={
              isShiny
                ? pokemon.sprites.other.home.front_shiny
                : pokemon.sprites.other.home.front_default
            }
            alt={pokemon.name}
            width="150px;"
            height="150px"
          />
        </ImageContainer>
      </DetailContainer>
    </>
  );
};
export default DetailPage;

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  background-color: var(--card-color-${props => props.color});
  border-radius: 10px;

  max-width: 1200px;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  cursor: pointer;
  max-width: 200px;
  grid-column: 2 / 3;
  grid-row: 5 / 6;
`;
