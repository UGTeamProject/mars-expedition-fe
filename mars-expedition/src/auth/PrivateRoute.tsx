import { useKeycloak } from '@react-keycloak/web';
import NotAuthorized from '../error-page/NotAuthorized';
import { ReactNode } from 'react';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { keycloak } = useKeycloak();
    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : <NotAuthorized />;
};

export default PrivateRoute;
