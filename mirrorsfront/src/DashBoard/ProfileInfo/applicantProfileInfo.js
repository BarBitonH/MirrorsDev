import React, {useState} from 'react';
import './ProfileInfo.css';

function ApplicantProfileInfo({ data }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);

    const handleEdit = (field, value) => {
        setEditedData({
            ...editedData,
            profileData: {
                ...editedData.profileData,
                [field]: value
            }
        });
    };

    const saveChanges = () => {
        // Ideally, send the editedData to the server to update applicant data.
        setIsEditing(false);
    };

    return (
        <div className="profile-info-container">
            <div className="profile-pic">
                <img src={data.profilePicture || null} alt="Applicant Profile" />
            </div>

            {isEditing ? (
                <div className="edit-mode">
                    {/* Main Edit Inputs */}
                    <input
                        value={editedData.location}
                        onChange={(e) => handleEdit('location', e.target.value)}
                        placeholder="Location"
                    />
                    <input
                        type="date"
                        value={editedData.dob}
                        onChange={(e) => handleEdit('dob', e.target.value)}
                        placeholder="Date of Birth"
                    />
                    <input
                        value={editedData.phone}
                        onChange={(e) => handleEdit('phone', e.target.value)}
                        placeholder="Phone Number"
                    />
                    <input
                        value={editedData.email}
                        onChange={(e) => handleEdit('email', e.target.value)}
                        placeholder="Email"
                    />
                    <textarea
                        value={editedData.aboutMe}
                        onChange={(e) => handleEdit('aboutMe', e.target.value)}
                        placeholder="About Me"
                    />
                    {/* Experiences, Skills, Educations */}
                    <textarea
                        value={editedData.experiences.join(', ')}
                        onChange={(e) => handleEdit('experiences', e.target.value.split(', '))}
                        placeholder="Experiences (comma-separated)"
                    />
                    <textarea
                        value={editedData.skills.join(', ')}
                        onChange={(e) => handleEdit('skills', e.target.value.split(', '))}
                        placeholder="Skills (comma-separated)"
                    />
                    <textarea
                        value={editedData.educations.join(', ')}
                        onChange={(e) => handleEdit('educations', e.target.value.split(', '))}
                        placeholder="Educations (comma-separated)"
                    />

                    <button onClick={saveChanges}>Save</button>
                </div>
            ) : (
                <div className="view-mode">
                    <div className="section">
                        <p><strong>Location:</strong> {data.location}</p>
                    </div>
                    <div className="section">
                        <p><strong>Date of Birth:</strong> {data.dob}</p>
                    </div>
                    <div className="section">
                        <p><strong>Phone Number:</strong> {data.phone}</p>
                    </div>
                    <div className="section">
                        <p><strong>Email:</strong> {data.email}</p>
                    </div>
                    <div className="section">
                        <p><strong>About Me:</strong> {data.aboutMe}</p>
                    </div>
                    <div className="section">
                        <p><strong>Experiences:</strong> {data.experiences.join(', ')}</p>
                    </div>
                    <div className="section">
                        <p><strong>Skills:</strong> {data.skills.join(', ')}</p>
                    </div>
                    <div className="section">
                        <p><strong>Educations:</strong> {data.educations.join(', ')}</p>
                    </div>

                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default ApplicantProfileInfo;