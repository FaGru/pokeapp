import React from 'react';
import styled from 'styled-components';
import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';
import backgroundPokeball from '../images/Background-Pokeball.svg';
import useStore from '../hooks/useStore';
import { stat } from 'fs/promises';

const activeDetailComponent = useStore<string>(
  state => state.activeDetailComponent
);
const DetailEvolution = () => {
  return (
    <>
      {activeDetailComponent === 'Evolution' ? (
        <div>
          <h3>Evolution Chart</h3>
          <ImageContainer>
            <PokeballImg
              src={backgroundPokeball}
              alt="Pokeball"
              height="100px"
              width="100px"
            />
          </ImageContainer>
        </div>
      ) : null}
    </>
  );
};

export default DetailEvolution;

const ImageContainer = styled.div``;

const PokeballImg = styled.img`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translate(-50%);
`;
