import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useState } from 'react';

import { DetailPageProps } from '../interfaces/interfaces';

const DetailPage: React.FC<DetailPageProps> = ({
  name,
  number,
  types,
  color,
  sprites,
  abilities,
}) => {
  const navigate = useNavigate();
  const [isShiny, setIsShiny] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => navigate('/', { replace: true })}>back</button>
      <DetailContainer color={color}>
        <p>Pokedex-ID: {number}</p>
        <h2>{name}</h2>
        <div>
          Types:
          {types.map(number => (
            <p key={nanoid()}>{number.type.name}</p>
          ))}
        </div>
        {abilities.map(ability => (
          <p>{ability.ability.name}</p>
        ))}
        <ImageContainer onClick={() => setIsShiny(!isShiny)}>
          <img
            src={
              isShiny
                ? sprites.other.home.front_shiny
                : sprites.other.home.front_default
            }
            alt={name}
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
