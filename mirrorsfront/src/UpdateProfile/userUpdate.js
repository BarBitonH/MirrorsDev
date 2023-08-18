import React, { useState } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #FFF8E1; /* light yellow background */
  }
`;

// Styled Components
const ProfilePictureContainer = styled.div`
  position: relative;
  width: 130px;  // Increase size a little for better visibility
  height: 130px;
  border-radius: 50%;
  margin: 0 auto 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #f4c542; // Using your theme yellow for the border

  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }
`;


const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out; // For smoother transition
`;

const UploadInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* hide the input */
  cursor: pointer;
`;




    const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300vh;
  padding: 20px;
`;
const Card = styled.div`
  width: 50%;
  background: white;
  border-radius: 15px; /* rounded corners */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* subtle shadow */
  padding: 40px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Title = styled.h1`
  font-size: 24px;
  color: #FFC107; /* Google's Material Design Yellow */
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1em;
  color: #777;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #FFEB3B; /* bright yellow border */
  border-radius: 7px; /* rounded corners */
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #FFC107;
  }
`;
const GalleryImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 10px;
  border-radius: 5px;
  object-fit: cover;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #FFEB3B;
  border-radius: 7px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #FFC107;
  }
`;
const ProfileImage = styled.div`
  width: 0%;
  height: 100%;
  background: white;
  background: url('https://via.placeholder.com/50?text=👤') no-repeat center;
  background-size: contain;
  transition: transform 0.3s ease-in-out; // For smoother transition

  &:hover {
    transform: scale(1.05);
  }
`;
const ImageUploadIcon = styled.svg`
  width: 1100px;
  height: 51000px;
  display: block;
  align-items: center;
`;
const ImageIcon = styled.svg`
  width: 50px;
  height: 50px;
  margin: 40px auto 0;
  display: block;
`;
const Button = styled.button`
  background: #FFEB3B; /* bright yellow background */
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  margin: 10px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FFC107;
  }
`;

const ProfileUpdate = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [userType, setUserType] = useState('applicant');
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [educations, setEducations] = useState([]);
    const [media, setMedia] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [dob, setDob] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async () => {
        let data = {
            location: location,
            dob: dob,
            phone: phone,
            email: email,
            aboutMe: aboutMe,
            experiences: experiences,
            skills: skills,
            educations: educations,
            media: media,
            galleryImages:galleryImages,
            profilePic:profilePic,
        };



        console.log(data);
        try {
            const response = await axios.post('http://localhost:3000/dbRouter/db/insert', data, {
                headers: {
                    'x_mir_token': localStorage.getItem('x_mir_token'),
                    db: 'Users',
                    collection: 'User_profile',
                    'Content-Type': 'application/json' // make sure the content type is set to JSON
                }
            });

            if (response.status === 200) {
                console.log("Profile updated successfully:", response.data);
                navigate('/Dashboard')
            } else {
                console.error("Error updating profile:", response.data);
            }
        } catch (error) {
            console.error("There was an error sending the request:", error);
        }
    };

    const addExperience = () => {
        if (experiences.length < 10) {
            setExperiences([...experiences, {}]);
        }
    };
    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => setProfilePic(e.target.result);
            reader.readAsDataURL(file);
        }
    };
    const addSkill = () => {
        if (skills.length < 10) {
            setSkills([...skills, ""]); // append empty skill
        }
    };
    const addGalleryImage = (image) => {
        setGalleryImages(prevImages => [...prevImages, image]);
    };
    const addEducation = () => {
        if (educations.length < 10) {
            setEducations([...educations, {}]);
        }
    };

    const handleGalleryFilesUpload = (event) => {
        const files = Array.from(event.target.files);
        setGalleryFiles(prevFiles => {
            const newFiles = [...prevFiles, ...files];
            return newFiles.slice(0, 10); // Ensuring we never exceed 10 files
        });
    };
    const addMedia = (type) => {
        if (media.length < 10) {
            setMedia([...media, { type }]);
        }
    };

    const handleGalleryImageUpload = (event) => {
        const files = Array.from(event.target.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onloadend = () => {
                setGalleryImages(prevImages => [...prevImages, reader.result]);
            };

            reader.readAsDataURL(file);
        });
    };
    function handleExperienceChange(event, index) {
        const newExperiences = [...experiences];
        newExperiences[index].description = event.target.value;
        setExperiences(newExperiences);
    }
    return (
        <Container>
            <GlobalStyle />
            <Card>
                <Header>
                    <Title>{userType === 'applicant' ? "Applicant Profile" : "Company Profile"}</Title>
                </Header>
                <ProfilePictureContainer onClick={() => document.getElementById("profilePicInput").click()}>
                    {profilePic ?
                        <ProfilePicture src={profilePic} alt="Profile" /> :
                        <ProfileImage />
                    }
                    <UploadInput id="profilePicInput" type="file" onChange={handleProfilePicChange} />
                </ProfilePictureContainer>
                {/* Personal Details */}
                <h2>Personal Details</h2>
                <Input type="text" placeholder="Full Name" />
                <Input type="text" placeholder="Location (City, Country)" onChange={e => setLocation(e.target.value)} value={location} />
                <Input type="text" placeholder="Date of Birth" onChange={e => setDob(e.target.value)} value={dob} />
                <Input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" />
                <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                <TextArea placeholder="Brief About Me (max 100 words)" rows="4" onChange={e => setAboutMe(e.target.value)} value={aboutMe} />

                {/* Experience */}
                <h2>Experience</h2>
                {experiences.map((experience, index) => (
                    <div key={index}>
                        {/* Replace this input with whatever structure you need */}
                        <input
                            type="text"
                            placeholder={`Experience ${index + 1}`}
                            value={experience.description || ''}
                            onChange={e => handleExperienceChange(e, index)}
                        />
                    </div>
                ))}
                <Button onClick={addExperience}>Add Experience</Button>

                {/* Skills */}
                <h2>Skills & Endorsements</h2>
                {skills.map((skill, idx) => (
                    <Input key={idx} type="text" value={skill} onChange={e => {
                        const updatedSkills = [...skills];
                        updatedSkills[idx] = e.target.value;
                        setSkills(updatedSkills);
                    }} placeholder={`Skill ${idx + 1}`} />
                ))}
                <Button onClick={addSkill}>Add Skill</Button>

                {/* Education */}
                <h2>Education</h2>
                {educations.map((education, idx) => (
                    <div key={idx}>
                        <select onChange={e => {
                            const updatedEducations = [...educations];
                            updatedEducations[idx].degree = e.target.value;
                            setEducations(updatedEducations);
                        }}>
                            <option value="bachelors">Bachelors</option>
                            <option value="masters">Masters</option>
                            <option value="phd">PhD</option>
                        </select>
                        <Input type="text" placeholder={`Institute Name ${idx + 1}`} />
                        <Input type="text" placeholder={`Field of Study ${idx + 1}`} />
                    </div>
                ))}
                <Button onClick={addEducation}>Add Education</Button>

                {/* Media */}
                <h2>Media & Publications</h2>
                {media.map((item, idx) => (
                    <div key={idx}>
                        <select onChange={e => {
                            const updatedMedia = [...media];
                            updatedMedia[idx].type = e.target.value;
                            setMedia(updatedMedia);
                        }}>
                            <option value="book">Book</option>
                            <option value="podcast">Podcast</option>
                        </select>
                        <Input type="text" placeholder={`Title ${idx + 1}`} />
                        <Input type="text" placeholder={`Link/Author ${idx + 1}`} />
                        <TextArea placeholder={`Main Idea ${idx + 1}`} rows="3" />
                    </div>
                ))}
                <Button onClick={addMedia}>Add Book/Podcast</Button>

                {/* Gallery Upload */}
                <h2>Gallery</h2>
                <GalleryContainer>
                    {galleryFiles.map((file, idx) => (
                        <GalleryImage key={idx} src={URL.createObjectURL(file)} alt={`Gallery Image ${idx + 1}`} onLoad={() => URL.revokeObjectURL(file)} />
                    ))}
                </GalleryContainer>
                {galleryFiles.length < 10 && (
                    <>
                        <input id="gallery-upload" type="file" multiple onChange={handleGalleryFilesUpload} style={{ display: 'none' }} />
                        <label htmlFor="gallery-upload" style={{ display: 'block', textAlign: 'center', cursor: 'pointer', color: '#667eea' }}>
                            Upload Gallery Images
                        </label>
                    </>
                )}

                <Button onClick={handleSubmit}>Save Profile</Button>
            </Card>
        </Container>
    );
};
export default ProfileUpdate;