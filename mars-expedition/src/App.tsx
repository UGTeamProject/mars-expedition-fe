import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Settings from './settings/Settings';
import Game from './game/Game';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
