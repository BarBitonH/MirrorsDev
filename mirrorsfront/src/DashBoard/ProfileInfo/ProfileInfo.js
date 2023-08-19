import React, { useState } from 'react';
import './ProfileInfo.css';

function ProfileInfo({ profileData }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(profileData);

    const handleEdit = (field, value) => {
        setEditedData({
            ...editedData,
            [field]: value
        });
    };

    const saveChanges = () => {
        // Here, you'd typically send editedData to your server to update user data.
        // After a successful update, you'd set isEditing back to false.
        setIsEditing(false);
    };

    return (
        <div className="profile-info-container">
            <div className="profile-pic">
                <img src={profileData.profilePic} alt="User Profile" />
            </div>

            {isEditing ? (
                <div className="edit-mode">
                    <input
                        value={editedData.location}
                        onChange={(e) => handleEdit('location', e.target.value)}
                    />
                    <input
                        type="date"
                        value={editedData.dob}
                        onChange={(e) => handleEdit('dob', e.target.value)}
                    />
                    <input
                        value={editedData.phone}
                        onChange={(e) => handleEdit('phone', e.target.value)}
                    />
                    <input
                        value={editedData.email}
                        onChange={(e) => handleEdit('email', e.target.value)}
                    />
                    <textarea
                        value={editedData.aboutMe}
                        onChange={(e) => handleEdit('aboutMe', e.target.value)}
                    />
                    <button onClick={saveChanges}>Save</button>
                </div>
            ) : (
                <div className="view-mode">
                    <p><strong>Location:</strong> {profileData.location}</p>
                    <p><strong>Date of Birth:</strong> {profileData.dob}</p>
                    <p><strong>Phone:</strong> {profileData.phone}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>About Me:</strong> {profileData.aboutMe}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default ProfileInfo;
