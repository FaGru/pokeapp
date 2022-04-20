import create from 'zustand';
import axios from 'axios';
import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';

interface pokeInterfaces {
  pokemonList: PokemonRootObject[];
  pokemonSpeciesDetails: SpeciesPokemonRootObject[];
  pokemonTypeDetails: SpeciesPokemonRootObject[];
  data: [];
  loading: boolean;
  error: boolean;
  setPokemonList: () => Promise<void>;
}

const initialize = (): {
  data: [] | null;
  loading: boolean;
  error: boolean;
} => {
  return {
    data: null,
    loading: false,
    error: false,
  };
};

const useStore = create<pokeInterfaces>((set, get) => ({
  pokemonList: [],
  pokemonSpeciesDetails: [],
  pokemonTypeDetails: [],
  data: [],
  loading: false,
  error: false,

  setPokemonList: async () => {
    set({ loading: true });
    let urlList: string[] = [];
    for (let i = 1; i <= 150; i++) {
      urlList = [...urlList, `https://pokeapi.co/api/v2/pokemon/${i}`];
    }
    Promise.all(urlList.map((url: string) => axios.get(url)))
      .then((responses: Object[]) => {
        let newData: PokemonRootObject[] = [];
        responses.forEach((response: any) => {
          newData = [...newData, response.data];
        });
        set({ loading: false });
        set({ pokemonList: newData });
      })
      .catch(() => {
        set({ loading: false });
        set({ error: true });
      });
  },
}));
export default useStore;
