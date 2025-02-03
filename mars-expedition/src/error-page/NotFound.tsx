import { useNavigate } from 'react-router-dom';
import './error-page.css';

function NotFound() {
    const navigate = useNavigate();

    const goToHome = () => navigate('/');

    return (
        <div className="error-page">
            <div>
                <h1>404</h1>
                <h3>Page not found.</h3>
                <button onClick={goToHome}>Go back to home</button>
            </div>
        </div>
    );
}

export default NotFound;
