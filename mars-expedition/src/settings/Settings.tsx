import MenuBar from '../components/menu/MenuBar';
import './settings.css';

function Settings() {
    return (
        <div className="settings-page">
            <MenuBar />
            <div className="settings">
                <h2>Settings</h2>
                <div className="delete">
                    <h3>Delete account</h3>
                    <p>Your account data and game progress will be deleted.</p>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
