import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Settings from './settings/Settings';
import Game from './game/Game';
import Home from './home/Home';
import LogIn from './auth/log-in/LogIn';
import SignUp from './auth/sign-up/SignUp';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import NotAuthorized from './error-page/NotAuthorized';
import NotFound from './error-page/NotFound';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                    <Route path="*" element={<NotFound />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/play" element={<Game />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
