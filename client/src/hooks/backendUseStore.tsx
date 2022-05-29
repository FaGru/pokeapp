import create from 'zustand';
import axios from 'axios';

const userLoginInformation = JSON.parse(
  localStorage.getItem('userLoginInformation') || '{}'
);

const backendUseStore = create((set: any, get: any) => ({
  userData: null,
  userLoginInformation: userLoginInformation,
  isError: false,
  isLoading: false,
  API_URL: '/users',

  register: async (formData: any) => {
    set({ isLoading: true });
    set({ isError: null });
    const API_URL = get().API_URL;
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
          isError: null,
          userLoginInformation: response.data,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Something went wrong. Please try again!',
      });
      console.log('ERROR WHILE REGISTERING');
    }
  },
  login: async (formData: any) => {
    set({ isLoading: true });
    set({ isError: null });
    const API_URL = get().API_URL + '/login';
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
          isError: null,
          userLoginInformation: response.data,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Login or password is invaild',
      });
      console.log('Login or password is invaild');
    }
  },

  getUserData: async (token: any) => {
    set({ isLoading: true, isError: null });
    const API_URL = get().API_URL + '/me';
    try {
      const response = await axios.get(API_URL, {
        //Pass Authentication Bearer token in header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        set({ isLoading: false, isError: null, userData: response.data });
        console.log('userData', response.data);
      }
    } catch (error) {
      set({
        isLoading: false,
        isError: 'Can not get User Data. Please try again',
      });
      console.log(error);
    }
  },
  logOut: () => {
    localStorage.removeItem('userLoginInformation');
    set({ userLoginInformation: {} , userData: null });
  },
}));

if (Object.keys(userLoginInformation).length !== 0) {
  backendUseStore.getState().getUserData(userLoginInformation.token);
}

export default backendUseStore;
