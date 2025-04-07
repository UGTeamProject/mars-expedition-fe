import { useNavigate } from 'react-router-dom';
import './home.css';
import '../styles.css';
import { Canvas } from '@react-three/fiber';
import { MarsModel } from '../components/mars/MarsModel';

function Home() {
    const navigate = useNavigate();

    const goToSignUp = () => navigate('/signup');
    const goToLogIn = () => navigate('/login');

    return (
        <div className="home-container">
            <Canvas className="background">
                <ambientLight intensity={0.5} />
                <MarsModel />
            </Canvas>
            <div className="home-menu">
                <div className="auth-btns">
                    <button className="signup-btn" onClick={goToSignUp} data-testid={'signup-button'}>
                        Sign up
                    </button>
                    <button className="login-btn" onClick={goToLogIn} data-testid={'login-button'}>
                        Log in
                    </button>
                </div>
            </div>
            <div className="content">
                <h1>Mars Expedition</h1>
                <div className="game-description">
                    <p>
                        Welcome, Pioneer! The Earth is on the brink of collapse. With dwindling resources and dangerous
                        global warming, humanity's survival rests in your hands.
                    </p>
                    <p>
                        As the leader of the most ambitious mission in history, you've been chosen to create a new
                        beginning for mankind - on the red sands of Mars. Your mission is clear: build a thriving colony
                        from the ground up. Mine crucial resources, harvest crops and construct safe buildings for the
                        settlers. Every decision you make will determine not only the fate of your colony, but the
                        survival of the whole human race.
                    </p>
                    <p>The stars have been calling. Galaxy is open for you. Will you accept the mission?</p>
                </div>
                <button className="signup-btn" onClick={goToSignUp} data-testid={'start-journey-button'}>
                    Start the journey
                </button>
            </div>
        </div>
    );
}

export default Home;
