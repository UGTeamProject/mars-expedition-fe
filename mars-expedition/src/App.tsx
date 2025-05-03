import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Settings from './settings/Settings';
import Game from './game/Game';
import Home from './home/Home';
import PrivateRoute from './auth/PrivateRoute';
import NotAuthorized from './error-page/NotAuthorized';
import NotFound from './error-page/NotFound';

function App() {

    return (
        <div id="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/play" element={
                        <PrivateRoute>
                            <Game />
                        </PrivateRoute>
                    }/>
                    <Route path="/settings" element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
