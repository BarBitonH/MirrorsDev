import React from 'react';
import shockedMan from '../assets/man_socked.png';
import MirrorsLogo from '../assets/MirrorsLogo.png';
import './SorryPage.css';
import { useNavigate } from 'react-router-dom';

const SorryPage = () => {
    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate('/login');
    };
    return (
        <div className="sorryPage">
            <div className="logoContainer">
                <img src={MirrorsLogo} alt="Mirrors Logo" className="logo" />
            </div>
            <div className="buttonContainer">
                <button className="loginButton" onClick={redirectToLogin}>
                    Log In
                </button>
            </div>
            <div className="messageContainer">
                <h1>Extended Inactivity Detected</h1>
                <p>We've noticed a significant period of inactivity with your session. For security reasons, we kindly ask you to interact with our system again. We apologize for any inconvenience.</p>
            </div>
            <div className="imageContainer">
                <img src={shockedMan} alt="Shocked Man" className="shockedManImage" />
            </div>
        </div>
    );
};

export default SorryPage;
