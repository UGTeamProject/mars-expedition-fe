import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { MarsModel } from '../components/mars/MarsModel';
import { Canvas } from '@react-three/fiber';
import './home.css';

function Home() {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();

    const goToGameIfAuthenticated = () => navigate('/play');

    return (
        <div className="home-container">
            <Canvas className="background">
                <ambientLight intensity={0.6} />
                <MarsModel />
            </Canvas>
            <div className="home-menu">
                {!keycloak.authenticated && (
                    <div className="auth-btns">
                        <button
                            className="signup-btn"
                            onClick={() =>
                                keycloak.register({ redirectUri: `${import.meta.env.VITE_FRONTEND_URL}/play` })
                            }
                            data-testid={'signup-button'}
                        >
                            Sign up
                        </button>
                        <button
                            className="login-btn"
                            onClick={() => keycloak.login({ redirectUri: `${import.meta.env.VITE_FRONTEND_URL}/play` })}
                            data-testid={'login-button'}
                        >
                            Log in
                        </button>
                    </div>
                )}
                {keycloak.authenticated && (
                    <button className="login-btn" onClick={goToGameIfAuthenticated} data-testid={'back-button'}>
                        Back to the colony
                    </button>
                )}
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
                {!keycloak.authenticated && (
                    <button
                        className="signup-btn"
                        onClick={() => keycloak.register()}
                        data-testid={'start-journey-button'}
                    >
                        Start the journey
                    </button>
                )}
                {keycloak.authenticated && (
                    <button className="signup-btn" onClick={goToGameIfAuthenticated} data-testid={'back-button'}>
                        Back to the colony
                    </button>
                )}
            </div>
        </div>
    );
}

export default Home;
