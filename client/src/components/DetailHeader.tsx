import styled from 'styled-components';
import useStore from '../hooks/useStore';

import { PokemonRootObject, Type } from '../interfaces/pokemon_interface';
import { useState } from 'react';
import backArrow from '../images/back-arrow.svg';
import backgroundPokeball from '../images/Background-Pokeball.svg';
import points from '../images/points.svg';

const DetailHeader: React.FC<{
  pokemon: PokemonRootObject;
  handleNavigate: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ pokemon, handleNavigate }) => {
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const setActiveDetailComponent = useStore(
    state => state.setActiveDetailComponent
  );

  const handleActiveComponent = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { target } = event;
    if (target)
      setActiveDetailComponent((target as HTMLButtonElement).innerText);
  };

  return (
    <ComponentContainer
      data-testid="component-container"
      color={pokemon.types[0].type.name}
    >
      <BackButton onClick={handleNavigate} aria-label="back-button">
        <img src={backArrow} width="25px" height="25px" alt="back" />
      </BackButton>
      <MainContainer>
        <ImageContainer onClick={() => setIsShiny(!isShiny)}>
          <img
            src={
              isShiny
                ? pokemon.sprites.other.home.front_shiny
                : pokemon.sprites.other.home.front_default
            }
            alt={pokemon.name}
            width="150px"
            height="150px"
          />
        </ImageContainer>
        <InfoContainer data-testid="infocontainer">
          <p>#{pokemon.id}</p>
          <h2>{pokemon.name}</h2>
          <div>
            {pokemon.types.map((type: Type) => (
              <img
                key={type.type?.name}
                src={`./images/type-${type.type?.name}.svg`}
                alt="poke-type"
              />
            ))}
          </div>
        </InfoContainer>
      </MainContainer>
      <NavContainer>
        <button onClick={handleActiveComponent}>About</button>
        <button onClick={handleActiveComponent}>Stats</button>
        <button onClick={handleActiveComponent}>Evolution</button>
      </NavContainer>
      <PokeballImg
        src={backgroundPokeball}
        alt="Pokeball"
        height="100px"
        width="100px"
      />
      <BackgroundName color={pokemon.types[0].type.name}>
        {pokemon.name}
      </BackgroundName>
      <PointsImg src={points} alt="Points" height="50px" width="80px" />
    </ComponentContainer>
  );
};
export default DetailHeader;

const ComponentContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 5vw 1fr 5vw;
  grid-template-rows: 40px auto auto;
  background-color: var(--card-color-${props => props.color});
  overflow: hidden;
`;
const MainContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
`;
const InfoContainer = styled.div`
  grid-column: 2 / 3;
  margin-top: 25px;

  h2 {
    margin: 5px;
    font-weight: bold;
    color: var(--font-color-white);
    :first-letter {
      text-transform: capitalize;
    }
  }
  div {
    display: flex;
    gap: 5px;
  }
  p {
    color: var(--font-color-number);
    margin: 0;
  }
`;
const ImageContainer = styled.div`
  cursor: pointer;

  grid-column: 1 / 2;
  justify-self: center;
  margin-right: 10px;
`;

const NavContainer = styled.div`
  grid-column: 1 / 4;
  grid-row: 3 / 4;
  display: flex;
  justify-content: space-around;
  margin: 20px;

  button {
    color: var(--font-color-white);
    width: 80px;
    border: none;
    background: none;
    text-align: center;
    cursor: pointer;
    z-index: 5;
  }
`;

const PokeballImg = styled.img`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translate(-50%);
`;

const PointsImg = styled.img`
  position: absolute;
  top: 60%;
  right: 0;
`;
const BackgroundName = styled.p`
  position: absolute;
  margin: 0;
  top: -8%;
  left: 50%;
  transform: translate(-50%);
  font-weight: 700;
  font-size: 100px;
  opacity: 25%;
  letter-spacing: 10px;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 0) 80%
  );
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BackButton = styled.button`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-top: 20px;
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
`;
