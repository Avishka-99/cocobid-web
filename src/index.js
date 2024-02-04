import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './store/Store';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
