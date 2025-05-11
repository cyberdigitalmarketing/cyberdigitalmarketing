import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// This is for static rendering with react-snap
// It uses hydrate instead of render

const rootElement = document.getElementById('root');

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    // For static site generation/hydration
    ReactDOM.hydrateRoot(rootElement, (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ));
  } else {
    // For normal development
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

// Add this for react-snap to work with service workers
// @ts-ignore
if (window.snapSaveState) {
  // @ts-ignore
  window.snapSaveState();
}