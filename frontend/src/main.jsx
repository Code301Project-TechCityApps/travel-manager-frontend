// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
