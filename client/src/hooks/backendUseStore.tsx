import create from 'zustand';
import axios from 'axios';

const userLoginInformationLocalStorage = JSON.parse(
  localStorage.getItem('userLoginInformation') || '{}'
);
interface userData {
  email: string;
  id: string;
  name: string;
}

interface userLoginInformation {
  email: string;
  _id: string;
  name: string;
  token: string;
}

const initialize = () => {
  return {
    email: '',
    _id: '',
    name: '',
    token: '',
  };
};

interface backendInterface {
  userData: userData | null;
  userLoginInformation: userLoginInformation | Object;
  isError: string;
  isLoading: boolean;
  API_URL: string;
  favoriteList: any | null;
  getFavoritesList: (arg0: string) => Promise<void>;
  getUserData: (arg0: string) => Promise<void>;
  register: (arg0: Object) => Promise<void>;
  login: (arg0: Object) => Promise<void>;
  logOut: () => void;
  setFavorites: (arg0: number) => Promise<void>;
}

const backendUseStore = create<backendInterface>((set, get) => ({
  userData: null,
  userLoginInformation: userLoginInformationLocalStorage,
  favoriteList: [],
  isError: '',
  isLoading: false,
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/',

  register: async (formData: Object) => {
    set({ isLoading: true });
    set({ isError: '' });
    const API_URL: string = get().API_URL + 'users/';
    try {
      const response = await axios.post(API_URL, formData);
      if (response.data) {
        localStorage.setItem(
          'userLoginInformation',
          JSON.stringify(response.data)
        );
        get().getUserData(response.data.token);
        set({
          isLoading: false,
          isError: '',
          userLoginInformation: response.data,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Something went wrong. Please try again!',
      });
    }
  },
  login: async (formData: Object) => {
    set({ isLoading: true });
    set({ isError: '' });
    const API_URL = get().API_URL + 'users/login';
    try {
      const response = await axios.post(API_URL, formData);
      if (response.data) {
        localStorage.setItem(
          'userLoginInformation',
          JSON.stringify(response.data)
        );
        get().getUserData(response.data.token);
        //GET FAV
        set({
          isLoading: false,
          isError: '',
          userLoginInformation: response.data,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Login or password is invaild',
      });
    }
  },

  getUserData: async (token: string) => {
    set({ isLoading: true, isError: '' });
    const API_URL: string = get().API_URL + 'users/me';
    try {
      const response = await axios.get(API_URL, {
        //Pass Authentication Bearer token in header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        set({ isLoading: false, isError: '', userData: response.data });
        get().getFavoritesList(token);
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Can not get User Data. Please try again',
      });
    }
  },
  logOut: () => {
    localStorage.removeItem('userLoginInformation');
    set({ userLoginInformation: {}, userData: null });
  },
  //////////liked Pokemon /////////////////

  getFavoritesList: async (token: string) => {
    const user = get().userLoginInformation;
    set({ isLoading: true, isError: '' });
    const API_URL = get().API_URL + 'pokemon/favorites';

    try {
      const response = await axios.get(API_URL, {
        //Pass Authentication Bearer token in header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        set({ isLoading: false, isError: '', favoriteList: response.data });
        console.log('getFAV: ', response.data);
        set({
          isLoading: false,
          isError: '',
          favoriteList: response.data,
        });
      }
    } catch {
      set({
        isLoading: false,
        isError: "Can't load favorites. Please try again",
      });
    }
  },

  setFavorites: async (pokemonId: number) => {
    set({ isLoading: true, isError: '' });
    const favoriteList = get().favoriteList;
    const userLoginInformation: any = get().userLoginInformation;
    const token = userLoginInformation.token;
    console.log(token);

    if (favoriteList.length === 0) {
      const API_URL = get().API_URL + `pokemon/favorites`;

      try {
        // const form = new FormData();
        // form.append('pokedexNumber', pokemonId])
        const response = await axios.post(
          API_URL,
          { pokedexNumber: pokemonId },
          {
            //Pass Authentication Bearer token in header
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch {}

      ///// put
    } else {
      const API_URL = get().API_URL + `pokemon/catch/${favoriteList[0]._id}`;
      console.log(favoriteList);
      try {
        console.log(pokemonId);
        if (favoriteList[0].pokedexNumber.includes(pokemonId)) {
          const newList = favoriteList[0].pokedexNumber.filter(
            (pokemon: any) => pokemon !== pokemonId
          );
          const response = await axios.put(
            API_URL,
            { pokedexNumber: newList },
            {
              //Pass Authentication Bearer token in header
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          const response = await axios.put(
            API_URL,
            { pokedexNumber: [...favoriteList[0].pokedexNumber, pokemonId] },
            {
              //Pass Authentication Bearer token in header
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // set({ isLoading: true, isError: '' });
        // if (likedPokemon.includes(pokemonId)) {
        //   const newBackendData = likedPokemon.filter;
        // } else {
        //   const newBackendData = [...likedPokemon, pokemonId];
        // }
      } catch {}
    }
    get().getFavoritesList(token);
  },
}));

if (Object.keys(userLoginInformationLocalStorage).length !== 0) {
  backendUseStore
    .getState()
    .getUserData(userLoginInformationLocalStorage.token);
}

export default backendUseStore;
[[4, 3], 1 , 2]