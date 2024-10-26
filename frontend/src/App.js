import React, { useState, useEffect } from 'react';
import './styles/App.css';
import CarouselComponent from './components/CarouselComponent';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';

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
      <div className="fade-in">
        <Helmet>
          <title>МастерЛаб - открывай науку шаг за шагом!</title>
        </Helmet>
        <Header />
        <CarouselComponent />
        <div className="content">
          <h1 align = "center">Мы рады приветствовать Вас в онлайн-сборнике научных экспериментов “МастерЛаб”!</h1>
          <p>
            <div className="row">
              <p align="center">Наше веб-приложение предлагает коллекцию тщательно подобранных экспериментов, которые подойдут как для школьников и студентов, так и для преподавателей и любителей науки.</p>
              <p align="center">Здесь вы найдете простые и интересные эксперименты, которые можно провести в домашних условиях или в учебных лабораториях, а также подробные описания методик и пошаговые инструкции для успешного выполнения каждого опыта.</p>
            </div>
          </p>
          <p align = "center">
            <em><b>Исследуйте, экспериментируйте и открывайте новые горизонты знаний вместе с нами!</b></em>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
