import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';

const lang = localStorage.getItem("lang") || "en";
i18next.changeLanguage(lang);
document.documentElement.lang = lang;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);