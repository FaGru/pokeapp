import styled from 'styled-components';
import { nanoid } from 'nanoid';

interface Props {
  name: string;
  number: number;
  types: [
    {
      slot: Number;
      type: {
        name: String;
        url: String;
      };
    },
    {
      slot: Number;
      type: {
        name: String;
        url: String;
      };
    }
  ];
  image: string;
  color: string;
}

const Pokecard: React.FC<Props> = ({ name, number, types, image, color }) => {
  return (
    <CardContainer data-testid="card-container" color={color}>
      <PokedexID>{number}</PokedexID>
      <PokemonName>{name}</PokemonName>
      <ImageContainer>
        <img src={image} alt={name} width="200" />
      </ImageContainer>
      <TypeContainer>
        <p>Type:</p>
        {types.map(number => (
          <p key={nanoid()}>{number.type.name}</p>
        ))}
      </TypeContainer>
    </CardContainer>
  );
};

const PokedexID = styled.p`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--card-color-gold);
  width: 35px;
  height: 35px;
  border-radius: 100%;
  border: 1px solid black;
  margin-left: 20px;
  font-weight: bold;
`;
const ImageContainer = styled.div`
  grid-column: 1 / 3;
  justify-self: center;
  width: 250px;
  background-color: black;
  border-radius: 10px;
  border: 1px solid var(--card-color-gold);
  box-shadow: inset 0 0 90px 2px var(--card-color-gold);
  img {
    &:active {
      animation: dance 1.2s alternate;
    }
    @keyframes dance {
      10% {
        transform: rotate(-5deg) translateY(-2px);
      }
      12% {
        transform: rotate(10deg) translateY(-2px);
      }
      14% {
        transform: rotate(-5deg) translateY(-2px);
      }
      16% {
        transform: rotate(10deg) translateY(-2px);
      }
      18% {
        transform: rotate(-5deg) translateY(-2px);
      }
      20% {
        transform: rotate(10deg) translateY(-2px);
      }
      25% {
        transform: rotate(-5deg) translateY(-2px);
      }
      30% {
        transform: rotate(15deg) translateY(-2px);
      }
      60% {
        transform: rotate(-15deg) translateY(-40px) scale(1.2);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;
const PokemonName = styled.h2`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  font-weight: bold;
`;
const TypeContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 5 / 6;
  justify-self: center;
  display: flex;
  gap: 10px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto 1fr 1fr 1fr;
  text-align: center;
  align-items: center;
  border: 2px solid var(--card-color-gold);
  width: 300px;
  height: 450px;
  margin: 5px;
  background-color: var(--card-color-${props => props.color});
  border-radius: 20px;
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

export default Pokecard;
