import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/Keycloak.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider authClient={keycloak}>
        <App />
    </ReactKeycloakProvider>,
);
