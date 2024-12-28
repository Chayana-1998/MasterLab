import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png';

const Header = ({ token, username, handleLogout }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
  };

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsDropdownOpen(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

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
              <div className="dropdown" ref={dropdownRef}>
              <span className="username" onClick={toggleDropdown}>👋 Привет, {username}!</span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/settings" className="dropdown-item">Настройки пользователя</Link>
                  <Link to="/my-experiments" className="dropdown-item">Мои эксперименты</Link>
                  <button className="dropdown-item" onClick={handleLogout}>Выйти</button>
                </div>
              )}
            </div>
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