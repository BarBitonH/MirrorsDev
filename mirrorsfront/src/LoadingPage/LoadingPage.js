import React from 'react';
import './LoadingPage.css'; // Assuming the CSS file is named 'LoadingPage.css' and is in the same directory.

const LoadingPage = () => {
    return (
        <div className="loading-container">

            {/* Concentric circles for added animation */}
            <div className="concentric-circle"></div>
            <div className="concentric-circle"></div>
            <div className="concentric-circle"></div>

            {/* Main loading animation */}
            <div className="loading-animation">

                {/* Inner circle with loading text */}
                <div className="inner-circle"></div>

            </div>
        </div>
    );
}

export default LoadingPage;
