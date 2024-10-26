import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png';

const Header = ({ token, username, handleLogout }) => {
    return (
      <header className="App-header">
        <div className="container">
          <div className="logo">
            <a href="/">
              <img src={Logo} alt="Логотип" className="logo" />
            </a>
          </div>
          <nav>
            <ul className="nav-links">
              <Link to="/" className="nav-link">ГЛАВНАЯ</Link>
              <Link to="/news" className="nav-link">НОВОСТИ</Link>
              <Link to="/about" className="nav-link">О НАС</Link>
              <Link to="/experiments" className="nav-link">ЭКСПЕРИМЕНТЫ</Link>
            </ul>
          </nav>
          <div className="login">
            {token ? (
              <>
                <span className="username">Привет, {username}!</span>
                <button className="login-btn" onClick={handleLogout}><b>ВЫЙТИ</b></button>
              </>
            ) : (
              <Link to="/login">
                <button className="login-btn"><b>ВХОД / РЕГИСТРАЦИЯ</b></button>
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  };
  
export default Header;