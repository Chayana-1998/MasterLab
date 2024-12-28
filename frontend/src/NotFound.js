import React, { useState, useEffect } from 'react';
import './styles/App.css';
import {Link} from 'react-router-dom';
import notfound from './components/404.png'
import { Helmet } from 'react-helmet';
import Header from './components/Header';

function NotFound({ token, setToken }) {

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
        <title>Ой!</title>
      </Helmet>
      <Header token={token} username={username} handleLogout={handleLogout} />
        <img className = "not-found-img" src = {notfound}></img>
    </div>
  );
} 

export default NotFound;