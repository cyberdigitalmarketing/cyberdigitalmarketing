import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    // For static site generation/hydration
    hydrateRoot(rootElement, (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ));
  } else {
    // For normal development
    createRoot(rootElement).render(
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
