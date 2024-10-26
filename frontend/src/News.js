import React, { useState, useEffect } from 'react';
import './styles/App.css';
import axios from 'axios'; // Импорт Axios для HTTP-запросов
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';

function News({ token, setToken }) {

  const [username, setUsername] = useState('');
  const [news, setNews] = useState([]); // Состояние для хранения новостей

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

  useEffect(() => {
    // Получение новостей с сервера
    axios.get('http://localhost:7777/news')
        .then(response => {
            console.log(response.data); // Добавьте это, чтобы проверить данные
            setNews(response.data);
        })
        .catch(error => {
            console.error('Ошибка при загрузке новостей:', error);
        });
}, []);

  return (
    <div className="App">
      <Helmet>
        <title>МастерЛаб — Новости</title>
      </Helmet>
      <Header />

    <div className="content">
        <h1 align="center">Новости</h1>
        <p align="center">Найдено — {news.length}</p>
        <ul className="news-list">
          {news.map((item, index) => (
            <li className="news-item" key={index}>
                <div className="news-content">
                  <Link to={`/news/${item._id}`} className="news-link">
                    <h2 align="center"><b>{item.title}</b></h2>
                  </Link>
                  <p><em>{item.author}</em></p>
                  <p><em>{new Date(item.createdAt).toLocaleDateString()}</em></p>
                </div>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
} 

export default News;