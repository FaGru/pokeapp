import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RootObject } from '../interfaces/interfaces';
import { useState } from 'react';

const DetailHeader: React.FC<{ pokemon: RootObject }> = ({ pokemon }) => {
  const navigate = useNavigate();
  const [isShiny, setIsShiny] = useState<boolean>(false);

  return (
    <ComponentContainer color={pokemon.types[0].type.name}>
      <BackButton onClick={() => navigate('/', { replace: true })}>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.2165 9.22309H4.87986L11.1433 2.95963C11.6439 2.45907 11.6439 1.63763 11.1433 1.13707C11.0246 1.01808 10.8835 0.923686 10.7283 0.859279C10.573 0.794871 10.4065 0.761719 10.2385 0.761719C10.0704 0.761719 9.90391 0.794871 9.74864 0.859279C9.59337 0.923686 9.45233 1.01808 9.33359 1.13707L0.875351 9.59531C0.756366 9.71405 0.661968 9.85509 0.597561 10.0104C0.533153 10.1656 0.5 10.3321 0.5 10.5002C0.5 10.6683 0.533153 10.8347 0.597561 10.99C0.661968 11.1453 0.756366 11.2863 0.875351 11.405L9.33359 19.8633C9.45242 19.9821 9.59349 20.0764 9.74874 20.1407C9.904 20.205 10.0704 20.2381 10.2385 20.2381C10.4065 20.2381 10.5729 20.205 10.7282 20.1407C10.8834 20.0764 11.0245 19.9821 11.1433 19.8633C11.2621 19.7444 11.3564 19.6034 11.4207 19.4481C11.485 19.2929 11.5181 19.1265 11.5181 18.9584C11.5181 18.7904 11.485 18.624 11.4207 18.4687C11.3564 18.3134 11.2621 18.1724 11.1433 18.0535L4.87986 11.7901H19.2165C19.9224 11.7901 20.5 11.2125 20.5 10.5066C20.5 9.80066 19.9224 9.22309 19.2165 9.22309Z"
            fill="white"
          />
        </svg>
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
            width="150px;"
            height="150px"
          />
        </ImageContainer>
        <p>#{pokemon.order}</p>
        <h2>{pokemon.name}</h2>
        <div>types</div>
      </MainContainer>
      <NavContainer>
        <button>About</button>
        <button>Stats</button>
        <button>Evolution</button>
      </NavContainer>
    </ComponentContainer>
  );
};
export default DetailHeader;

const ComponentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  background-color: var(--card-color-${props => props.color});
`;
const MainContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  margin: 20px;
`;
const ImageContainer = styled.div`
  cursor: pointer;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
`;

const NavContainer = styled.div`
  grid-column: 1 / 4;
  grid-row: 3 / 4;
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;
const BackButton = styled.button`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background: none;
  border: none;
`;

