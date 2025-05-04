import { NavLink } from 'react-router-dom';
import MenuDropdown from './MenuDropdown';
import './menu.css';

function MenuBar() {
    return (
        <div className="menu">
            <NavLink to="/" className="logo">
                <img src="logo.svg" alt={'logo'} />
            </NavLink>
            <div className="options">
                <NavLink to="/play" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    Play
                </NavLink>
                <MenuDropdown />
            </div>
        </div>
    );
}

export default MenuBar;
