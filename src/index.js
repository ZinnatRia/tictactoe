import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the import change here!
import './index.css';
import App from './App';

// Create a root container for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
