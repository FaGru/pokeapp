import create from 'zustand';
import axios from 'axios';

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user') || '{}');

const backendUseStore = create((set: any, get: any) => ({
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  API_URL: '/users',
  reset: () => {
    set({ isError: false, isSuccess: false, isLoading: false, message: '' });
  },

  register: async (userData: any) => {
    const API_URL = get().API_URL;
    const response = await axios.post(API_URL, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log(response);

    return response.data;
  },

  // set({
  //   [key]: {
  //     data: previousData,
  //     loading: true,
  //     error: null,
  //   },
  // });
}));

export default backendUseStore;

// async function loginUser(username) {
//   setIsUsernameTaken(false);
//   //New User
//   const response = await fetch(
//     `https://api.spacetraders.io/users/${username}/claim`,
//     {
//       method: 'POST',
//     }
//   ).catch(error => {
//     console.log('ERROR', error.message);
//   });
