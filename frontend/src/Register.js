import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/App.css';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация длины пароля
    if (password.length < 6) {
      setError('Пароль должен быть длиной от 6 символов и больше.');
      return;
    }

    try {
      await axios.post('http://localhost:1234/auth/register', { username, password });
      setError('');
      alert('Регистрация прошла успешно!');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Ой-ой! Что-то пошло не так... Попробуйте позже');
      }
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>МастерЛаб — Регистрация</title>
      </Helmet>
      <Header />
    <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 align="center">Регистрация</h2>
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
                <button type="submit" className="login-btn">Зарегистрироваться!</button>
                <p>Уже есть аккаунт? <Link to="/login">Смелее входите!</Link></p>
            </form>
      </div>

      <Footer />
    </div>
  );
} 

export default Register;