import React, { useState } from 'react';
import './SideBar.css';
import { useNavigate } from "react-router-dom";

const sections = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Profile Info", icon: "👤" },
    { name: "Find You Career Match", icon: "🖼️",route:"/ActionFlow" },
    { name: "User Stats", icon: "📊" },
    { name: "Settings", icon: "⚙️" },
    { name: "Jobs List", icon: "📋", route: "/JobList" },  // Added a route key
];

function Sidebar() {
    const [activeSection, setActiveSection] = useState("Dashboard");
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();  // Call useNavigate here

    const handleSectionClick = (section) => {
        setActiveSection(section.name);
        if (section.route) {
            navigate(section.route);  // Navigate to the route associated with the section
        }
    }

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
                        onClick={() => handleSectionClick(section)}
                    >
                        <span>{section.icon}</span> {section.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
