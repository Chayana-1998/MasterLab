import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import {useParams, Link, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Comments from './components/Comments';
import { Helmet } from 'react-helmet';

function ExperimentDetails({ token, setToken }) {
    const { id } = useParams();
    const [experiment, setExperiment] = useState(null);
    const navigate = useNavigate();
  
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const fetchExperiment = async () => {
        const response = await axios.get(`http://localhost:1234/experiments/${id}`);
        setExperiment(response.data);
      };
  
      fetchExperiment();
    }, [id]);
  
      const handleLogout = () => {
          setToken('');
          localStorage.removeItem('token');
      localStorage.removeItem('userId');
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
  
    if (!experiment) {
      return <div>Загрузка...</div>;
    }
  
    return (
      <div className="App">
        <Helmet>
          <title>{experiment.title} — МастерЛаб</title>
        </Helmet>
        <Header token={token} username={username} handleLogout={handleLogout} />

            <div className="experiment-details-container">
            <h1 className="experiment-title">{experiment.title}</h1>
            <div className="experiment-meta">
              <div>Автор: {experiment.username}</div>
              <div>Дата добавления: {new Date(experiment.dateAdded).toLocaleDateString()}</div>
              <div>Сложность: {experiment.difficulty}</div>
            </div>
            {experiment.imageUrl && <img src={`http://localhost:1234${experiment.imageUrl}`} className="experiment-detail-image" />}
            <br></br>
            <div className="menu2">
              <p>Содержание</p>
              <ol>
                <li><a href="#description">Описание</a></li>
                <li><a href="#instructions">Инструкции</a></li>
                <li><a href="#comments">Комментарии к рецепту</a></li>
                <br></br>
              </ol>
            </div>
            <h2 id="description">Описание</h2>
            <div className="experiment-description">
              <p align="left">{experiment.description}</p>
            </div>

            <div className="experiment-instructions">
              <h2 id="instructions">Инструкции</h2>
              <ol>
                {experiment.instructions.split('\n').map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div className="experiment-comments">
              <h2 id="comments">Комментарии к рецепту</h2>
              <Comments experimentId={id} token={token} />
            </div>
          </div>
        <Footer />
      </div>
    );
  } 
  export default ExperimentDetails;