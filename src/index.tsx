import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';

import reportWebVitals from './reportWebVitals';

/**
 *  @returns {JSX.Element}: returns Homepage
 */
const container: any = document.getElementById('root');
const root: any = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
