import styled from 'styled-components';
import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';
import useStore from '../hooks/useStore';

const DetailStats: React.FC<{
  pokemon: PokemonRootObject;
}> = ({ pokemon }) => {
  const pokemonTypeDetails = useStore<TypesPokemonRootObject | null>(
    state => state.pokemonTypeDetails
  );
  const pokemonSpeciesDetails = useStore<SpeciesPokemonRootObject | null>(
    state => state.pokemonSpeciesDetails
  );
  const activeDetailComponent = useStore<string>(
    state => state.activeDetailComponent
  );

  return (
    <>{activeDetailComponent === 'Stats' ? <p>hallo ich bin stats</p> : null}</>
  );
};

export default DetailStats;
