import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { PokecardProps } from '../interfaces/pokemon_interface';
import points from '../images/points.svg';
import backgroundPokeball from '../images/Background-Pokeball.svg';

export interface DanceProps {
  active: boolean;
}

const Pokecard: React.FC<PokecardProps> = ({
  name,
  number,
  types,
  image,
  color,
}) => {
  const navigate = useNavigate();
  const [dance, setDance] = useState<boolean>(false);

  const handleClick = () => {
    setDance(true);
    setTimeout(function () {
      navigate(`/${name}`);
    }, 1500);
  };
  return (
    <CardContainer
      data-testid="card-container"
      color={color}
      onClick={handleClick}
    >
      <PokedexID>#{number}</PokedexID>
      <PokemonName>{name[0].toUpperCase() + name.slice(1)}</PokemonName>

      <TypeContainer>
        {types.map(type => (
          <img
            key={type?.type.url}
            src={`./images/type-${type.type?.name}.svg`}
            alt="poke-type"
          />
        ))}
      </TypeContainer>
      <PokeballImage alt="pokeball" width="130px" src={backgroundPokeball} />
      <PointsImage alt="points" src={points} />
      <PokemonIMG
        src={image}
        alt={name}
        width="140"
        height="140"
        active={dance}
      />
    </CardContainer>
  );
};

const PokedexID = styled.p`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: var(--font-color-number);
  margin: 0px;
`;

const PokemonIMG = styled.img<DanceProps>`
  position: absolute;
  place-self: end;
  top: -45px;

  ${props =>
    props.active &&
    `  animation: dance 1.5s alternate;

  @keyframes dance {
    4% {
      transform: rotate(-5deg) translateY(-2px);
    }
    6% {
      transform: rotate(10deg) translateY(-2px);
    }
    8% {
      transform: rotate(-5deg) translateY(-2px);
    }
    10% {
      transform: rotate(10deg) translateY(-2px);
    }
    12% {
      transform: rotate(-5deg) translateY(-2px);
    }
    14% {
      transform: rotate(10deg) translateY(-2px);
    }
    16% {
      transform: rotate(-5deg) translateY(-2px);
    }
    18% {
      transform: rotate(15deg) translateY(-2px);
    }
    35% {
      transform: rotate(-15deg) translateY(-40px) scale(1.2);
    }
    60% {
      transform: translateY(0);
    }
    100% {
      transform: translateX(+1500px);
    }
  }`};
`;
const PokemonName = styled.h2`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  font-weight: bold;
  color: var(--font-color-white);
  margin: 0px;
`;
const TypeContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 4;

  display: flex;
  gap: 10px;
  p {
    font-size: 120%;
    margin: 0px;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: var(--card-color-${props => props.color});
  width: 320px;
  height: 120px;
  border-radius: 10px;

  padding: 20px;
  position: relative;
  box-shadow: 1px 1px darkgray, 0 15px 12px rgba(0, 0, 0, 0.22);
  cursor: pointer;

  &:hover {
    transition: ease 0.5s;
    animation: bounce 1s alternate;
  }

  @keyframes bounce {
    20% {
      transform: translateY(-10px);
    }
    40% {
      transform: translateY(0px);
    }
    80% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const PokeballImage = styled.img`
  position: absolute;
  right: 5px;
  top: -5px;
  opacity: 0.6;
`;

const PointsImage = styled.img`
  position: absolute;
  top: -5px;
  right: 145px;
`;

export default Pokecard;
