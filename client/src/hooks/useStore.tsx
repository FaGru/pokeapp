import create from 'zustand';
import axios from 'axios';
import { PokemonRootObject } from '../interfaces/pokemon_interface';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';
import { EvolutionRootObject } from '../interfaces/evolution_interface';
import { AllTypesRootObject } from '../interfaces/all_types_interface';

interface pokeInterfaces {
  pokemonList: PokemonRootObject[];
  pokeTypesList: AllTypesRootObject | null;
  searchInput: { searchString: string; errorState: boolean };
  filterSelect: string[];
  isSearchVisible: boolean;
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
  fetchPokeTypesList: () => Promise<void>;
  setActiveDetailComponent: (arg0: string) => void;
  setSearchInput: (arg0: string, arg1: boolean) => void;
  setIsSearchVisible: () => void;
  setFilterSelect: (arg0: string[]) => void;
}

const useStore = create<pokeInterfaces>((set, get) => ({
  pokemonList: [],
  isSearchVisible: false,
  searchInput: {
    searchString: '',
    errorState: false,
  },
  filterSelect: [],
  pokeTypesList: null,
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

    try {
      const { data } = await axios.get<SpeciesPokemonRootObject>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
      );
      set({ loadingSpecies: false });
      set({ pokemonSpeciesDetails: data });
    } catch {
      set({ loadingSpecies: false });
      set({ error: true });
    }
  },
  fetchPokeTypesList: async () => {
    try {
      const { data } = await axios.get<AllTypesRootObject>(
        `https://pokeapi.co/api/v2/type/`
      );
      set({ pokeTypesList: data });
    } catch {
      set({ error: true });
    }
  },

  fetchTypeData: async (pokemonTypesUrl: string) => {
    set({ loadingTypes: true });

    try {
      const { data } = await axios.get<TypesPokemonRootObject>(pokemonTypesUrl);
      set({ loadingTypes: false });
      set({ pokemonTypeDetails: data });
    } catch {
      set({ loadingTypes: false });
      set({ error: true });
    }
  },
  fetchEvolutionData: async (url: string): Promise<void> => {
    set({ loadingEvolution: true });
    try {
      const { data } = await axios.get<EvolutionRootObject>(url);
      set({ loadingEvolution: false });
      set({ pokemonEvolutionChain: data });
    } catch {
      set({ loadingEvolution: false });
      set({ error: true });
    }
  },
  setActiveDetailComponent: (activeDetailNavButton: string) => {
    set({ activeDetailComponent: activeDetailNavButton });
  },
  setSearchInput: (userInput: string, errorState: boolean) => {
    set({
      searchInput: { searchString: userInput, errorState: errorState },
    });
  },
  setIsSearchVisible: () => {
    const isSearchVisible = get().isSearchVisible;
    set({
      isSearchVisible: !isSearchVisible,
    });
  },
  setFilterSelect: (input: string[]) => {
    set({
      filterSelect: input,
    });
  },
}));
export default useStore;
