import React from 'react';
import '../styles/App.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
        <div className = "qa">
            <h4>Остались вопросы? Пишите нам!</h4>
            <div className = "mail-to">
            <p><a href="mailto:feedback@masterlab.ru">feedback@masterlab.ru</a></p>
            </div>
        </div>
        <p className = "qa"> &copy; Веб-приложение "МастерЛаб", 2024 год  |  <Link to="/policy">Политика конфиденциальности</Link> | </p>
        </footer>
    );
};

export default Footer;