import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../Features/userSlice';
import { useLocation,useNavigate } from 'react-router-dom';

const UserComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUserData(navigate, location.pathname));
  }, [dispatch, navigate, location.pathname]);

  return (
    <img src={user.image} alt="Icon" width="32" height="32" className="rounded-circle" />
  );
};

export default UserComponent;