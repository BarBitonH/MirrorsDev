import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/MirrorsLogo.png';
import './WelcomePage.css';

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <img src={logo} alt="Mirrors Logo" className="welcome-logo" />
            <div className="welcome-content">
                <div className="welcome-text">
                    <h1>Welcome to Mirrors</h1>
                    <p>Your journey to extraordinary begins here!</p>
                </div>
                <div className="welcome-rectangles">
                    <div className="rectangle login-rectangle">
                        <h3>Login</h3>
                        <p>Already a member? Sign in now!</p>
                        <Link to="/login" className="welcome-button login-button">Login</Link>
                    </div>
                    <div className="rectangle register-rectangle">
                        <h3>Register</h3>
                        <p>New here? Join us today!</p>
                        <Link to="/register" className="welcome-button register-button">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
