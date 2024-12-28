import React, { useState, useEffect } from 'react';
import './styles/App.css';
import CarouselComponent from './components/CarouselComponent';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';

function About({token, setToken}) {
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
          <title>МастерЛаб - О нас</title>
        </Helmet>
        <Header token={token} username={username} handleLogout={handleLogout} />
        <CarouselComponent />
        <div className="content">
          <h1 align = "center">О нас</h1>
          <p>
            <div className="row">
              <p align="center">Наша цель — сделать науку доступной, интересной и вдохновляющей для всех,
                кто стремится узнать больше о том, как устроен наш мир. Мы собрали коллекцию увлекательных и
                познавательных экспериментов, которые можно легко провести в домашних условиях, в школе или
                лаборатории. Наши эксперименты охватывают широкий спектр научных дисциплин, от физики и химии до
                биологии и экологии, что позволяет каждому найти что-то по душе.</p>
              <p align="center">Мы верим в то, что наука — это не только теоретические знания, но и практическое
                понимание окружающего мира. Каждый наш эксперимент сопровождается подробными инструкциями,
                объяснением научных принципов и полезными советами для безопасного и увлекательного проведения
                опытов.</p>
              <p align="center">Наша миссия — помочь учащимся и любителям науки развивать критическое мышление,
                любознательность и навыки решения проблем. Мы хотим, чтобы каждый, кто воспользуется нашим сборником, 
                почувствовал себя настоящим исследователем и открыл для себя радость научных открытий.</p>
            </div>
          </p>
          <p align = "center">
            <em><b>Веб-приложение разработала: Сат Чаяна, студент группы ЗИС-21-1 ФГБОУ ВО «Байкальский государственный университет».</b></em>
          </p>
        </div>
        <Footer />
      </div>
  );
}

export default About;
