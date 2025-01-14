import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Settings from './settings/Settings';
import Game from './game/Game';
import Home from './home/Home';
import LogIn from './auth/log-in/LogIn';
import SignUp from './auth/sign-up/SignUp';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Game />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
