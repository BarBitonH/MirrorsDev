import React, { useState } from 'react';
import './SideBar.css';

const sections = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Profile Info", icon: "👤" },
    { name: "Gallery", icon: "🖼️" },
    { name: "User Stats", icon: "📊" },
    { name: "Settings", icon: "⚙️" },
];

function Sidebar() {
    const [activeSection, setActiveSection] = useState("Dashboard");
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`sidebar ${darkMode ? 'dark' : ''}`}>
            <button onClick={() => setDarkMode(!darkMode)}>
                Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
            <ul>
                {sections.map(section => (
                    <li
                        key={section.name}
                        className={activeSection === section.name ? 'active' : ''}
                        onClick={() => setActiveSection(section.name)}
                    >
                        <span>{section.icon}</span> {section.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
