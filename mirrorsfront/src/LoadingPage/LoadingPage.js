import React from 'react';
import './LoadingPage.css'; // Assuming the CSS file is named 'LoadingPage.css' and is in the same directory.

const LoadingPage = () => {
    return (
        <div className="loading-container">

            <div className="concentric-circle"></div>
            <div className="concentric-circle"></div>
            <div className="concentric-circle"></div>

            <div className="loading-animation">

                <div className="inner-circle"></div>

            </div>
        </div>
    );
}

export default LoadingPage;
