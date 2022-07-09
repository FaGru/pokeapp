import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { PokecardProps } from '../interfaces/pokemon_interface';
import points from '../images/points.svg';
import backgroundPokeball from '../images/Background-Pokeball.svg';
import backendUseStore from '../hooks/backendUseStore';

export interface Props {
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
  const { userFavoritesData, setFavorites } = backendUseStore(state => state);

  const handleClick = () => {
    setDance(true);
    setTimeout(function () {
      navigate(`/${name}`);
    }, 1500);
  };

  const handleCatch = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    setFavorites(number);
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
      <FavoriteImage
        onClick={handleCatch}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        active={
          userFavoritesData[0]?.favoritePokemonList?.includes(number)
            ? true
            : false
        }
        width="30"
        height="30"
      >
        <path
          d="M24.017 7.634c-0.629 -1.488 -1.53 -2.826 -2.678 -3.973 -1.148 -1.147 -2.486 -2.049 -3.973 -2.678C15.825 0.331 14.188 0 12.5 0c-1.687 0 -3.324 0.331 -4.866 0.983 -1.488 0.629 -2.826 1.531 -3.973 2.678 -1.147 1.148 -2.049 2.485 -2.678 3.973C0.331 9.176 0 10.813 0 12.5c0 1.688 0.331 3.325 0.983 4.866 0.629 1.488 1.531 2.825 2.678 3.973 1.148 1.148 2.485 2.049 3.973 2.679 1.541 0.652 3.178 0.983 4.866 0.983 1.688 0 3.325 -0.331 4.866 -0.983 1.488 -0.629 2.825 -1.53 3.973 -2.679 1.147 -1.147 2.048 -2.485 2.678 -3.973 0.652 -1.541 0.983 -3.178 0.983 -4.866 0 -1.687 -0.331 -3.324 -0.983 -4.866z"
          fill="#ed5564"
        />
        <path
          d="M0.005 12.851c0.043 1.563 0.371 3.081 0.978 4.515 0.629 1.488 1.531 2.825 2.678 3.973 1.148 1.148 2.485 2.049 3.973 2.679 1.541 0.652 3.178 0.983 4.866 0.983 1.688 0 3.325 -0.331 4.866 -0.983 1.488 -0.629 2.825 -1.53 3.973 -2.679 1.147 -1.147 2.048 -2.485 2.678 -3.973 0.607 -1.434 0.935 -2.952 0.978 -4.515H0.005z"
          fill="#e6e9ed"
        />
        <path
          d="M24.94 13.731a12.706 12.706 0 0 0 0.06 -1.231 12.776 12.776 0 0 0 -0.075 -1.381c-0.621 0.096 -1.513 0.221 -2.637 0.344 -2.133 0.235 -5.562 0.516 -9.789 0.516 -4.226 0 -7.655 -0.281 -9.788 -0.516 -1.124 -0.124 -2.016 -0.249 -2.637 -0.344A12.678 12.678 0 0 0 0 12.5c0 0.413 0.02 0.824 0.06 1.231 2.028 0.305 6.496 0.851 12.44 0.851s10.413 -0.546 12.44 -0.851z"
          fill="#434a54"
        />
        <path
          d="M15.105 13.021c0 1.438 -1.167 2.604 -2.605 2.604s-2.604 -1.166 -2.604 -2.604c0 -1.438 1.166 -2.604 2.604 -2.604s2.605 1.166 2.605 2.604z"
          fill="#e6e9ed"
        />
        <path
          d="M12.5 8.333c-2.585 0 -4.687 2.103 -4.687 4.687s2.103 4.687 4.687 4.687 4.687 -2.103 4.687 -4.687 -2.103 -4.687 -4.687 -4.687zm0 6.771c-1.149 0 -2.083 -0.935 -2.083 -2.084s0.935 -2.083 2.083 -2.083c1.149 0 2.083 0.935 2.083 2.083s-0.934 2.084 -2.083 2.084z"
          fill="#434a54"
        />
        <path
          d="M24.017 7.634c-0.629 -1.488 -1.53 -2.826 -2.678 -3.973 -1.148 -1.147 -2.486 -2.049 -3.973 -2.678C15.825 0.331 14.188 0 12.5 0a13.078 13.078 0 0 0 -0.521 0.011c1.503 0.061 2.962 0.387 4.345 0.972 1.489 0.629 2.826 1.531 3.973 2.678 1.147 1.148 2.049 2.485 2.679 3.973 0.652 1.541 0.982 3.178 0.982 4.866 0 1.688 -0.33 3.325 -0.982 4.866 -0.629 1.488 -1.531 2.825 -2.679 3.973 -1.147 1.148 -2.484 2.049 -3.973 2.679 -1.382 0.584 -2.841 0.911 -4.345 0.972a13.076 13.076 0 0 0 0.521 0.011c1.688 0 3.325 -0.331 4.866 -0.983 1.488 -0.629 2.825 -1.53 3.973 -2.679 1.147 -1.147 2.048 -2.485 2.678 -3.973 0.652 -1.541 0.983 -3.178 0.983 -4.866 0 -1.687 -0.331 -3.325 -0.983 -4.866z"
          opacity=".2"
          fill="#fff"
        />
        <path
          d="M0.983 17.366c0.629 1.488 1.531 2.825 2.678 3.973 1.148 1.148 2.485 2.049 3.973 2.679 1.541 0.652 3.178 0.983 4.866 0.983a13.078 13.078 0 0 0 0.521 -0.011c-1.503 -0.061 -2.962 -0.388 -4.345 -0.972 -1.488 -0.629 -2.825 -1.53 -3.973 -2.679 -1.148 -1.147 -2.049 -2.485 -2.679 -3.973 -0.652 -1.541 -0.982 -3.178 -0.982 -4.866 0 -1.687 0.33 -3.325 0.982 -4.866C2.654 6.146 3.555 4.809 4.703 3.661c1.148 -1.148 2.484 -2.049 3.973 -2.679C10.058 0.398 11.517 0.072 13.021 0.011a13.171 13.171 0 0 0 -0.521 -0.011c-1.687 0 -3.324 0.331 -4.866 0.983 -1.488 0.629 -2.826 1.531 -3.973 2.679 -1.147 1.147 -2.049 2.484 -2.678 3.973C0.331 9.176 0 10.813 0 12.5c0 1.688 0.331 3.325 0.983 4.866z"
          opacity=".1"
        />
      </FavoriteImage>
    </CardContainer>
  );
};

const PokedexID = styled.p`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: var(--font-color-number);
  margin: 0px;
`;

const FavoriteImage = styled.svg<Props>`
  position: absolute;
  top: 12px;
  left: 65px;
  fill-opacity: ${props => (props.active ? '1' : '0.3')};
  &:hover {
    fill-opacity: 1;
  }
`;

const PokemonIMG = styled.img<Props>`
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
