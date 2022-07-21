import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';

import reportWebVitals from './reportWebVitals';

/**
 *  @returns {JSX.Element}: returns Homepage
 */

const container: HTMLElement | null = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find root document');
}
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
