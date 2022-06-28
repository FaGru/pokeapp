import create from 'zustand';
import axios from 'axios';

const userLoginInformationLocalStorage = JSON.parse(
  localStorage.getItem('userLoginInformation') ||
    '{   "_id": "",   "name": "",   "email": "",   "token": "" }'
);
interface userData {
  email: string;
  id: string;
  name: string;
}

interface UserLoginInformation {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface UserFavoriteData {
  _id: string;
  user: string;
  favoritePokemonList: number[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface backendInterface {
  userData: userData | null;
  userLoginInformation: UserLoginInformation;
  userFavoritesData: UserFavoriteData[] | [];
  isError: string;
  isLoading: boolean;
  API_URL: string;
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
  userFavoritesData: [],
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
        isError: 'Can not get User data. Please try again',
      });
    }
  },
  logOut: () => {
    localStorage.removeItem('userLoginInformation');
    set({
      userLoginInformation: { _id: '', name: '', email: '', token: '' },
      userData: null,
    });
  },

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
        set({
          isLoading: false,
          isError: '',
          userFavoritesData: response.data,
        });
        set({
          isLoading: false,
          isError: '',
          userFavoritesData: response.data,
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
    set({ isError: '' });
    const userFavoritesData = get().userFavoritesData;
    const userLoginInformation: UserLoginInformation =
      get().userLoginInformation;
    const token: string = userLoginInformation.token;

    if (userFavoritesData.length === 0) {
      const API_URL = get().API_URL + `pokemon/favorites`;

      try {
        const response = await axios.post(
          API_URL,
          { favoritePokemonList: pokemonId },
          {
            //Pass Authentication Bearer token in header
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch {
        set({
          isError: 'Error while liking. Please try again',
        });
      }
    } else {
      const API_URL =
        get().API_URL + `pokemon/catch/${userFavoritesData[0]._id}`;
      try {
        if (userFavoritesData[0].favoritePokemonList.includes(pokemonId)) {
          const newList = userFavoritesData[0].favoritePokemonList.filter(
            (pokemon: any) => pokemon !== pokemonId
          );
          const response = await axios.put(
            API_URL,
            { favoritePokemonList: newList },
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
            {
              favoritePokemonList: [
                ...userFavoritesData[0].favoritePokemonList,
                pokemonId,
              ],
            },
            {
              //Pass Authentication Bearer token in header
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch {
        set({
          isError: 'Error while liking. Please try again',
        });
      }
    }
    get().getFavoritesList(token);
  },
}));

if (userLoginInformationLocalStorage.token.length !== 0) {
  backendUseStore
    .getState()
    .getUserData(userLoginInformationLocalStorage.token);
}
export default backendUseStore;
