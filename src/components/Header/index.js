import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaPowerOff } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Nav } from './styled';

import * as actions from '../../store/modules/auth/actions';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(actions.loginFailure());
    toast.success('Você deslogou!');
    navigate('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size="20px" />
      </Link>
      <Link to="/register">
        <FaUserAlt size="20px" />
      </Link>
      {isLoggedIn ? (
        <Link to="/logout" onClick={handleLogout}>
          <FaPowerOff size="20px" />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size="20px" />
        </Link>
      )}
      {isLoggedIn && <FaCircle size="20px" color="66ff33" />}
    </Nav>
  );
}
