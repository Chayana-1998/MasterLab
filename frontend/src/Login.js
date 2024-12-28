import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/App.css';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';

function Login({ setToken }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1234/auth/login', { username, password });
      const { token, userId } = response.data;
      setToken(token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username); // Сохраняем username в локальное хранилище
      navigate('/experiments');
    } catch (error) {
      console.error('Error during login', error);
      setError('Неправильный логин или пароль. Попробуйте еще раз');
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>МастерЛаб — Вход</title>
      </Helmet>
      <Header />
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 align="center">Вход</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    className="login-input"
                    type="text"
                    required
                    placeholder="Ник"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-btn">Войти</button>
                <p>Еще не с нами? <Link to="/register">Зарегистрируйтесь!</Link></p>
            </form>
      </div>

      <Footer />
    </div>
  );
} 

export default Login;