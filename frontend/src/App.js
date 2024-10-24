import React, { useState, useEffect } from 'react';
import './styles/App.css';
import logo from './logo.png';
import CarouselComponent from './components/CarouselComponent';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function App({token, setToken}) {
  const [username, setUsername] = useState('');
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setUsername('');
    }
  }, [token]);

  return (
    <div className="App">
      <Helmet>
        <title>МастерЛаб - открывай науку шаг за шагом!</title>
      </Helmet>
      <header className="App-header">
        <div className="container">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Логотип" className="logo"></img>
            </a>
          </div>
          <nav>
            <ul class="nav-links">
              <Link to="/" className="nav-link">ГЛАВНАЯ</Link>
              <Link to="/news" className="nav-link">НОВОСТИ</Link>
              <Link to="/about" className="nav-link">О НАС</Link>
              <Link to="/experiments" className="nav-link">ЭКСПЕРИМЕНТЫ</Link>
            </ul>
          </nav>
          <div class="login">
            {token ? (
              <><span className = "username">Привет, {username}!</span>
              <button className='login-btn' onClick={handleLogout}><b>ВЫЙТИ</b></button></>
            ) : (
            <Link to="/login">
                <button class="login-btn"><b>ВХОД / РЕГИСТРАЦИЯ</b></button>
            </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
