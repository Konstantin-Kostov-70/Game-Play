import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/Boundaries/ErrorBoundaries'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HashRouter>

);

reportWebVitals();
