import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  image: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserSuccess: (state, action) => {
      const { firstname, lastname, email, image} = action.payload.user;
      return {
        ...state,
        firstname,
        lastname,
        email,
        image,
      };
    }
  }
});

export const fetchUserData = (navigate) => {
  return dispatch => {
    // Make API call to fetch user data
    // Example:
    axios.get('https://zealand.moedekjaer.dk/final/api/public/api/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((response) => {
      dispatch(fetchUserSuccess(response.data));
    }).catch(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  };
};

export const { fetchUserSuccess } = userSlice.actions;

export default userSlice.reducer;