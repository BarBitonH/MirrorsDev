import React from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css';

function Chart({ data }) {
    const chartData = {
        labels: data.map(d => d.date),
        datasets: [{
            label: 'Users Over Time',
            data: data.map(d => d.userCount),
            borderColor: '#007BFF',
            fill: false
        }]
    };

    return (
        <div className="chart-container">
            <Line data={chartData} />
        </div>
    );
}

export default Chart;
