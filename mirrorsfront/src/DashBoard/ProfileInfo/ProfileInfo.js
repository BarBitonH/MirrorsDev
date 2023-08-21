import React, {useState} from 'react';
import './ProfileInfo.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import the icons you need

function ProfileInfo({data}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);

    const socialMediaIcons = {
        facebook: <FaFacebook />,
        twitter: <FaTwitter />,
        instagram: <FaInstagram />,
        linkedin: <FaLinkedin />
    };
    const handleEdit = (field, value) => {
        setEditedData({
            ...editedData,
            [field]: value
        });
    };

    const handleEditSubData = (section, index, key, value) => {
        const items = [...editedData.profileData[section]];
        items[index][key] = value;

        setEditedData(prevState => ({
            ...prevState,
            profileData: {
                ...prevState.profileData,
                [section]: items
            }
        }));
    };

    const saveChanges = () => {
        // Ideally, send the editedData to the server to update company data.
        setIsEditing(false);
    };

    return (
        <div className="profile-info-container">
            <div className="profile-pic">
                <img src={data.profilePicture} alt="Company Profile"/>
            </div>

            {isEditing ? (
                <div className="edit-mode">
                    {/* Main Edit Inputs */}
                    <input
                        value={editedData.contactEmail}
                        onChange={(e) => handleEdit('contactEmail', e.target.value)}
                        placeholder="Contact Email"
                    />
                    <input
                        value={editedData.phoneNumber}
                        onChange={(e) => handleEdit('phoneNumber', e.target.value)}
                        placeholder="Phone Number"
                    />
                    <input
                        value={editedData.website}
                        onChange={(e) => handleEdit('website', e.target.value)}
                        placeholder="Website"
                    />
                    <input
                        value={editedData.companySize}
                        onChange={(e) => handleEdit('companySize', e.target.value)}
                        placeholder="Company Size"
                    />
                    <input
                        value={editedData.specialties}
                        onChange={(e) => handleEdit('specialties', e.target.value)}
                        placeholder="Specialties"
                    />


                    {/* Collaborations Edit */}
                    <div className="section collabs">
                        <strong>Edit Collaborations:</strong>
                        {editedData.collabs.map((collab, index) => (
                            <input
                                key={index}
                                value={collab.collaboration}
                                onChange={(e) => handleEditSubData('collabs', index, 'collaboration', e.target.value)}
                                placeholder="Collaboration"
                            />
                        ))}
                    </div>

                    {/* Testimonials Edit */}
                    <div className="section testimonials">
                        <strong>Edit Testimonials:</strong>
                        {editedData.testimonials.map((testimonial, index) => (
                            <input
                                key={index}
                                value={testimonial.testimonial}
                                onChange={(e) => handleEditSubData('testimonials', index, 'testimonial', e.target.value)}
                                placeholder="Testimonial"
                            />
                        ))}
                    </div>

                    {/* Awards Edit */}
                    <div className="section awards">
                        <strong>Edit Awards:</strong>
                        {editedData.awards.map((award, index) => (
                            <input
                                key={index}
                                value={award.award}
                                onChange={(e) => handleEditSubData('awards', index, 'award', e.target.value)}
                                placeholder="Award"
                            />
                        ))}
                    </div>

                    <button onClick={saveChanges}>Save</button>
                </div>
            ) : (
                <div className="view-mode">
                    <div className="section">
                        <p><strong>Contact Email:</strong> {data.contactEmail}</p>
                    </div>
                    <div className="section">
                        <p><strong>Phone Number:</strong> {data.phoneNumber}</p>
                    </div>
                    <div className="section">
                        <p><strong>Website:</strong> {data.website}</p>
                    </div>
                    <div className="section">
                        <p><strong>Company Size:</strong> {data.companySize}</p>
                    </div>
                    <div className="section">
                        <p><strong>Specialties:</strong> {data.specialties}</p>
                    </div>

                    {/* Social Links */}
                    <div className="section">
                        <strong>Social Links:</strong>
                        <div style={{display: 'flex', gap: '10px'}}>
                            {Object.entries(data.socialLinks || {}).map(([key, value]) => {
                                return (
                                    <a key={key} href={value} target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                                        {socialMediaIcons[key.toLowerCase()]}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    {/* Collaborations Display */}
                    <div className="section collabs">
                        <strong>Collaborations:</strong>
                        <ul>
                            {data.collabs.map((collab, index) => (
                                <li key={index}>{collab.collaboration}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Testimonials Display */}
                    <div className="section testimonials">
                        <strong>Testimonials:</strong>
                        <ul>
                            {data.testimonials.map((testimonial, index) => (
                                <li key={index}>{testimonial.testimonial}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Awards Display */}
                    <div className="section awards">
                        <strong>Awards:</strong>
                        <ul>
                            {data.awards.map((award, index) => (
                                <li key={index}>{award.award}</li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default ProfileInfo;
