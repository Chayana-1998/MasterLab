import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import {Link, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet';

function AddExperiment({ token, setToken }) {

    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
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

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
        setError('Сложность должна быть числом от 1 до 5.');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('difficulty', difficulty);
    formData.append('description', description);
    if (image) {
    formData.append('image', image);
    }

    try {
    await axios.post('http://localhost:1234/experiments',
        formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
        }
    );
    alert('Ура! Эксперимент добавлен!');
    setTitle('');
    setInstructions('');
    setDifficulty('');
    setDescription('');
    setImage(null);
    } catch (error) {
    console.error(error);
    alert('Ой-ой! Ошибка сервера...');
    }
    };  

  return (
    <div className="App">
      <Helmet>
        <title>МастерЛаб — Добавить эксперимент</title>
      </Helmet>
      <Header token={token} username={username} handleLogout={handleLogout} />

      <div align="center" className="content">
        <form onSubmit={handleSubmit} className = "experiment-form" method="post" encType="multipart/form-data">
        <h2>Добавление эксперимента</h2>
          {error && <p>{error}</p>}
          <br></br>
          <div>
            <label>Название эксперимента*:  </label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <br></br>

          <div>
            <label>Инструкции*:  </label>
            <textarea onChange={(e) => setInstructions(e.target.value)} required />
          </div>
          <br></br>

          <div>
            <label>Сложность по шкале от 1 до 5*:  </label>
            <input type="number" min = "1" max = "5" onChange={(e) => setDifficulty(e.target.value)} required />
          </div>
          <br></br>
          
          <div>
            <label>Описание*:  </label>
            <textarea onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Изображение*:  </label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required/>
          </div>
          <br></br>
          <button className="login-btn" type="submit"><b>ДОБАВИТЬ ЭКСПЕРИМЕНТ</b></button>
        </form>
      </div>
      <Footer />
    </div>
  );
} 

export default AddExperiment;