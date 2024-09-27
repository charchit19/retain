import React from 'react';
import '../styles/navbar.css';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="top-icons">
                <li><CropOriginalIcon /></li>
                <li><ShoppingBagOutlinedIcon /></li>
            </ul>
            <div className="settings-icon">
                <SettingsIcon />
            </div>
        </nav>
    );
}

export default Navbar;
