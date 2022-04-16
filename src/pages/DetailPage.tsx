import DetailHeader from '../components/DetailHeader';
import DetailAbout from '../components/DetailAbout';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { PokemonRootObject } from '../interfaces/interfaces';

const DetailPage: React.FC<{ pokemon: PokemonRootObject }> = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleNavigate: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/');
  };

  return (
    <DetailPageContainer>
      <DetailHeader pokemon={pokemon} handleNavigate={handleNavigate} />
      <DetailAbout pokemon={pokemon} />
    </DetailPageContainer>
  );
};
export default DetailPage;

const DetailPageContainer = styled.div``;
