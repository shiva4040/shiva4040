import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Research Colophon in Developer Console
console.log(
  '%c SHIVA // AI RESEARCH LAB %c \nMathematical foundations of deep learning & neural architectures.\nhttps://shiva404.in (React + Vite)',
  'background: #0D0E14; color: #FFFFFF; font-weight: 700; padding: 4px 8px; border-radius: 4px; font-family: monospace;',
  'color: #2563EB; font-family: monospace; font-size: 11px;'
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
