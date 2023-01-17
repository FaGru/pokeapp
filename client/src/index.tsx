import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';

import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

if (!container) {
throw new Error('Failed to find root document');
}

const Root = createRoot(container);

const render = (): void => {
Root.render(
<React.StrictMode>
<BrowserRouter>
<GlobalStyle />
<App />
</BrowserRouter>
</React.StrictMode>
);
};

render();
reportWebVitals();

export default render;
