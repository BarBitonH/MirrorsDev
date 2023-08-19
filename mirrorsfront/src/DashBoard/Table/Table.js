import React from 'react';
import './Table.css';

function Table({ data }) {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Event</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.user}</td>
                        <td>{row.event}</td>
                        <td>{row.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
