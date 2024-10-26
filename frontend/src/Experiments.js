import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import {Link, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet';

function Experiments({ token, setToken }) {

  const [experiments, setExperiments] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [experimentCount, setExperimentCount] = useState(0);

  const userId = localStorage.getItem('userId'); // Получаем userId из локального хранилища

  useEffect(() => {
    const fetchExperiments = async () => {
      const response = await axios.get('http://localhost:7777/experiments');
      setExperiments(response.data);
    };

    // Функция для получения количества экспериментов
    const fetchExperimentCount = async () => {
      const response = await fetch('http://localhost:7777/experiments/count');
      const data = await response.json();
      setExperimentCount(data.count);
    };

    fetchExperiments();
    fetchExperimentCount(); // Вызов функции для получения количества экспериментов
  }, []);

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
        <title>МастерЛаб — Эксперименты</title>
      </Helmet>
      <Header />

      <div align="center" className="content">
			   <h1 align = "center">Эксперименты</h1>
         <Link to="/new_experiment">
                <button className="login-btn"><b>ДОБАВИТЬ ЭКСПЕРИМЕНТ</b></button>
          </Link>
          <br></br>
          <br></br>
               <p align="center">Найдено — {experimentCount}</p>
          <br></br>
          <div className="recipe-grid">
            {experiments.map(experiment => (
                <div className="recipe-card" key={experiment._id}>
                    <Link to={`/experiments/${experiment._id}`} className="recipe-link">
                        <h1 className="recipe-title">{experiment.title}</h1>
                    </Link>
                    {experiment.imageUrl && <img src={`http://localhost:7777${experiment.imageUrl}`} alt={experiment.title} className="recipe-image" />}
                    <div className="recipe-info">
                        <p><strong>Автор:</strong> {experiment.username}</p>
                        <p><strong>Дата добавления:</strong> {new Date(experiment.dateAdded).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
} 

export default Experiments;