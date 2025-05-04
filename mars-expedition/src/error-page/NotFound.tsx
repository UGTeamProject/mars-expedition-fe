import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import './error-page.css';

function NotFound() {
    const navigate = useNavigate();

    const goToHome = () => navigate('/');

    return (
        <div className="error-page">
            <div>
                <h1>404</h1>
                <h3>Page not found.</h3>
                <Button
                    id="error-btn"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<UndoIcon />}
                    onClick={goToHome}
                >
                    Go to home
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
