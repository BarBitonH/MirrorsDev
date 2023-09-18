import React from 'react';
import './UserCard.css';
import axios from 'axios';


const UserCard = ({ userData }) => {
    const isEmpty = !userData || Object.keys(userData).length === 0;

    return (
        <div className="user-card">
            {/* Profile Picture */}
            <div className="profile-picture-section">
                {isEmpty ? (
                    <div className="skeleton profile-picture-skeleton"></div>
                ) : (
                    <img src={userData.userProfilePic} alt="Profile Picture" className="profile-picture" />
                )}
            </div>

            {/* User Info */}
            <div className="section user-info-section">
                <h3 className="section-title">User Info</h3>
                <div>Fullname: {isEmpty ? <span className="skeleton"></span> : userData.fullName}</div>
                <div>DOB: {isEmpty ? <span className="skeleton"></span> : userData.dob}</div>
                {/* Add more fields similarly as required */}
            </div>

            {/* User Summary */}
            <div className="section summary-section">
                <h3 className="section-title">About Me</h3>
                <p>{isEmpty ? <span className="skeleton summary-skeleton"></span> : userData.aboutme}</p>
            </div>

            {/* Experience */}
            <div className="section experience-section">
                <h3 className="section-title">Experience</h3>
                {isEmpty ? <div className="skeleton"></div> : userData.userExp.map(exp => (
                    <div className="single-experience">
                        <div>Title: {exp.title || <span className="skeleton"></span>}</div>
                        {/* Add more fields similarly as required */}
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="section education-section">
                <h3 className="section-title">Education</h3>
                {isEmpty ? <div className="skeleton"></div> : userData.Education.map(edu => (
                    <div className="single-education">
                        <div>Type: {edu.type || <span className="skeleton"></span>}</div>
                        <div>Filed:{edu.filed}||<span> className = "skeleton"></span>}</div>
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="section skills-section">
                <h3 className="section-title">Skills</h3>
                {isEmpty ? <div className="skeleton"></div> : userData.userSkills.map(skill => (
                    <span className="skill">{skill}</span>
                ))}
            </div>

            {/* Gallery */}
            <div className="section gallery-section">
                <h3 className="section-title">Gallery</h3>
                {isEmpty ? <div className="skeleton gallery-skeleton"></div> : userData.gallery.map(image => (
                    <img src={image} alt="Gallery Item" className="gallery-image" />
                ))}
            </div>

            {isEmpty && <div className="watermark">There are no more users relevant to you. Please try again later.</div>}
        </div>
    );
}

export default UserCard;
