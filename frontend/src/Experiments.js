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
      const response = await axios.get('http://localhost:1234/experiments');
      setExperiments(response.data);
    };

    // Функция для получения количества экспериментов
    const fetchExperimentCount = async () => {
      const response = await fetch('http://localhost:1234/experiments/count');
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
      <Header token={token} username={username} handleLogout={handleLogout} />

      <div align="center" className="content">
			   <h1 align = "center">Эксперименты</h1>
         <Link to="/new_experiment">
                <button className="login-btn"><b>ДОБАВИТЬ ЭКСПЕРИМЕНТ</b></button>
          </Link>
          <br></br>
          <br></br>
               <p align="center">Найдено — {experimentCount}</p>
          <br></br>
          <div className="experiment-grid">
            {experiments.map(experiment => (
                <div className="experiment-card" key={experiment._id}>
                    <Link to={`/experiments/${experiment._id}`} className="experiment-link">
                        <h1 className="experiment-title">{experiment.title}</h1>
                    </Link>
                    {experiment.imageUrl && <img src={`http://localhost:1234${experiment.imageUrl}`} alt={experiment.title} className="experiment-image" />}
                    <div className="experiment-info">
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