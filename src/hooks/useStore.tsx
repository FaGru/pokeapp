import create from 'zustand';
import axios from 'axios';
import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';

interface pokeInterfaces {
  pokemonList: PokemonRootObject[];
  pokemonSpeciesDetails: SpeciesPokemonRootObject | null;
  pokemonTypeDetails: TypesPokemonRootObject | null;
  data: [];
  loadingPokemon: boolean;
  loadingSpecies: boolean;
  loadingTypes: boolean;
  error: boolean;
  setPokemonList: () => Promise<void>;
  fetchSpeciesData: (arg0: number) => Promise<void>;
  fetchTypeData: (arg0: string) => Promise<void>;
}

const useStore = create<pokeInterfaces>((set, get) => ({
  pokemonList: [],
  pokemonSpeciesDetails: null,
  pokemonTypeDetails: null,
  data: [],
  loadingPokemon: false,
  loadingSpecies: false,
  loadingTypes: false,
  error: false,

  setPokemonList: async () => {
    set({ loadingPokemon: true });
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
        set({ loadingPokemon: false });
        set({ pokemonList: newData });
      })
      .catch(() => {
        set({ loadingPokemon: false });
        set({ error: true });
      });
  },

  fetchSpeciesData: async (pokemonId: number) => {
    set({ loadingSpecies: true });
    const { data }: any = await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .catch(() => {
        set({ loadingSpecies: false });
        set({ error: true });
      });
    set({ loadingSpecies: false });
    set({ pokemonSpeciesDetails: data });
  },

  fetchTypeData: async (pokemonTypesUrl: string) => {
    set({ loadingTypes: true });
    const { data }: any = await axios.get(pokemonTypesUrl).catch(() => {
      set({ loadingTypes: false });
      set({ error: true });
    });
    set({ loadingTypes: false });
    set({ pokemonTypeDetails: data });
  },
}));
export default useStore;
