import React from 'react';
import './Metrics.css';

function Metrics({ data }) {
    return (
        <div className="metrics-container">
            <div className="metric">
                <span className="metric-value">{data.totalUsers}</span>
                <span className="metric-title">Total Users</span>
            </div>
            <div className="metric">
                <span className="metric-value">{data.totalEvents}</span>
                <span className="metric-title">Total Events</span>
            </div>
        </div>
    );
}

export default Metrics;
