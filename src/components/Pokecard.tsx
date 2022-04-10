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
      <img src={image} alt={name} width="200" />
      <p>Pokedex ID: {number}</p>
      <p>Name: {name}</p>

      {types.map(number => (
        <p key={nanoid()}>{number.type.name}</p>
      ))}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 1px solid darkgray;
  width: 350px;
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
