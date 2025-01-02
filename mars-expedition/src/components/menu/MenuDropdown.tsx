import { Dropdown, DropdownButton, DropdownDivider } from 'react-bootstrap';
import './menu.css';
import { Link } from 'react-router-dom';

function MenuDropdown() {
    return (
        <DropdownButton
            id="menu-dropdown"
            size="lg"
            title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="circle-placeholder.png"
                        alt="Placeholder"
                        style={{
                            width: '40px',
                            height: '30px',
                        }}
                    />
                    Placeholder
                </div>
            }
        >
            <Dropdown.Item as={Link} to="/settings">
                Settings
            </Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Item className="log-out-btn">Log out</Dropdown.Item>
        </DropdownButton>
    );
}

export default MenuDropdown;
