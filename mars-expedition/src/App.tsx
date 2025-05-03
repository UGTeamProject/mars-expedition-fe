import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Settings from './settings/Settings';
import Game from './game/Game';
import Home from './home/Home';
import PrivateRoute from './auth/PrivateRoute';
import NotAuthorized from './error-page/NotAuthorized';
import NotFound from './error-page/NotFound';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c9763e',
            contrastText: '#fff',
        },
        warning: {
            main: '#8a0000',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'MuseoModerno, Arial, sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                    <Route path="*" element={<NotFound />} />
                    <Route
                        path="/play"
                        element={
                            <PrivateRoute>
                                <Game />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
