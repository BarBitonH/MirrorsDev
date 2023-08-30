import React from 'react';
import './Notifications.css';

function Notifications({ data }) {
    return (
        <div className="notifications-container">
            <h3>Recent Notifications</h3>
            <ul>
                {data.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
