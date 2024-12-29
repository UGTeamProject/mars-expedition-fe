import { NavLink } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";
import "./menu.css";

export default function MenuBar() {

    return (
        <div className="menu">
            <a><img src="circle-placeholder.png"/></a>
            <div className="options">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    Play
                </NavLink>
                <MenuDropdown/>
            </div>
        </div>
    );
}