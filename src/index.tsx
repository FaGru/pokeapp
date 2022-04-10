import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
