import ReactDOM from 'react-dom/client';
import keycloak from './auth/Keycloak.ts';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { NotificationProvider } from './components/notification/Notification.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider authClient={keycloak}>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </ReactKeycloakProvider>,
);
