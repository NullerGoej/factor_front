import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './features/userSlice';
import { useNavigate } from 'react-router-dom';

const UserComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData(navigate));
  }, [dispatch, navigate]);

  return (
    <img src={user.image} alt="Icon" width="32" height="32" className="rounded-circle" />
  );
};

export default UserComponent;