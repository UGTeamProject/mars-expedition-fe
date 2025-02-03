import { useNavigate } from 'react-router-dom';
import './error-page.css';

function NotAuthorized() {
    const navigate = useNavigate();

    const goToHome = () => navigate('/');

    return (
        <div className="error-page">
            <div>
                <h1>401</h1>
                <h3>You are not authorized to see this page.</h3>
                <button onClick={goToHome}>Go back to home</button>
            </div>
        </div>
    );
}

export default NotAuthorized;
