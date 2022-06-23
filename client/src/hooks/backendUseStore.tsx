import create from 'zustand';
import axios from 'axios';

const userLoginInformation = JSON.parse(
  localStorage.getItem('userLoginInformation') || '{}'
);
interface userData {
  email: string;
  id: string;
  name: string;
}
interface backendInterface {
  userData: userData | null;
  userLoginInformation: Object;
  isError: string;
  isLoading: boolean;
  API_URL: string;
  getUserData: (arg0: string) => Promise<void>;
  register: (arg0: Object) => Promise<void>;
  login: (arg0: Object) => Promise<void>;
  logOut: () => void;
}

const backendUseStore = create<backendInterface>((set, get) => ({
  userData: null,
  userLoginInformation: userLoginInformation,
  isError: '',
  isLoading: false,
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',

  register: async (formData: Object) => {
    set({ isLoading: true });
    set({ isError: '' });
    const API_URL: string = get().API_URL + '/users';
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
    const API_URL = get().API_URL + 'users/me';
    try {
      const response = await axios.get(API_URL, {
        //Pass Authentication Bearer token in header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        set({ isLoading: false, isError: '', userData: response.data });
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

  handleCatch: async (pokemonId: number) => {
    set({ isLoading: true, isError: '' });
    if (likedPokemon.includes(pokemonId)) {
      likedList: [...likedList, pokemonId];
    }
    const API_URL = get().API_URL + `/pokemon/favorites/${pokemonId}`;
  },
}));

if (Object.keys(userLoginInformation).length !== 0) {
  backendUseStore.getState().getUserData(userLoginInformation.token);
}

export default backendUseStore;
