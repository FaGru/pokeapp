import create from 'zustand';
import axios from 'axios';
import { PokemonRootObject } from '../interfaces/pokemon_interface';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';
import { EvolutionRootObject } from '../interfaces/evolution_interface';

interface pokeInterfaces {
  pokemonList: PokemonRootObject[];
  pokemonSpeciesDetails: SpeciesPokemonRootObject | null;
  pokemonTypeDetails: TypesPokemonRootObject | null;
  pokemonEvolutionChain: EvolutionRootObject | null;
  loadingPokemon: boolean;
  loadingSpecies: boolean;
  loadingTypes: boolean;
  loadingEvolution: boolean;
  error: boolean;
  activeDetailComponent: string;
  fetchPokemonList: () => Promise<void>;
  fetchSpeciesData: (arg0: number) => Promise<void>;
  fetchTypeData: (arg0: string) => Promise<void>;
  fetchEvolutionData: (arg0: string) => Promise<void>;
  setActiveDetailComponent: (arg0: string) => void;
}

const useStore = create<pokeInterfaces>((set, get) => ({
  pokemonList: [],
  pokemonSpeciesDetails: null,
  pokemonTypeDetails: null,
  pokemonEvolutionChain: null,
  loadingPokemon: false,
  loadingSpecies: false,
  loadingTypes: false,
  loadingEvolution: false,
  error: false,
  activeDetailComponent: 'About',

  fetchPokemonList: async () => {
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
  fetchEvolutionData: async (url: string) => {
    set({ loadingEvolution: true });
    const { data }: any = await axios.get(url).catch(() => {
      set({ loadingEvolution: false });
      set({ error: true });
    });
    set({ loadingEvolution: false });
    set({ pokemonEvolutionChain: data });
  },
  setActiveDetailComponent: (activeDetailNavButton: string) => {
    set({ activeDetailComponent: activeDetailNavButton });
  },
}));
export default useStore;
