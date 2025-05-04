import { NavLink } from 'react-router-dom';
import MenuDropdown from './MenuDropdown';
import './menu.css';

function MenuBar() {
    return (
        <div className="menu">
            <a>
                <img src="logo.svg" />
            </a>
            <div className="options">
                <NavLink to="/play" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Play
                </NavLink>
                <MenuDropdown />
            </div>
        </div>
    );
}

export default MenuBar;
