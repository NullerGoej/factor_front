import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  image: '',
  phone: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserSuccess: (state, action) => {
      const { firstname, lastname, email, image, phone} = action.payload.user;
      return {
        ...state,
        firstname,
        lastname,
        email,
        image,
        phone,
      };
    }
  }
});

export const fetchUserData = (navigate, location) => {
  return dispatch => {
    // Make API call to fetch user data
    // Example:
    axios.get('https://accessio-api.moedekjaer.dk/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((response) => {
      dispatch(fetchUserSuccess(response.data));
      if (response.data.user.phone === 0) {
        navigate('/setup-1');
      } else if (response.data.user.phone === 1) {
        navigate('/setup-2');
      } else if (location === '/setup-1' || location === '/setup-2') {
        navigate('/');
      }
    }).catch(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  };
};

export const { fetchUserSuccess } = userSlice.actions;

export default userSlice.reducer;