import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/not-authorized" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
