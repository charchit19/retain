import React from 'react';
import '../styles/header.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
    return (
        <div className='header-main'>
            <ArrowBackIcon className="back-icon" />
            <h1>Rules creation</h1>
        </div>
    );
}

export default Header;
