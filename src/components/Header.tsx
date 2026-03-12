import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { RootState } from '../store';
import './Header.scss';

const Header: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/movies" className="nav-link">Фильмы</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="nav-link">Профиль</Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Выйти
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Войти</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;