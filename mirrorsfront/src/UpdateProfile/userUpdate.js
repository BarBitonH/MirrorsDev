import React, { useState } from 'react';
import styled, {createGlobalStyle} from 'styled-components';

// ... [styled components definitions from above] ...

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
    const [experienceCount, setExperienceCount] = useState(1);
    const [skillCount, setSkillCount] = useState(1);
    const [educationCount, setEducationCount] = useState(1);
    const [galleryImages, setGalleryImages] = useState([]);
    const [mediaCount, setMediaCount] = useState(1);

    const addExperience = () => {
        if (experienceCount < 10) {
            setExperienceCount(experienceCount + 1);
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
        if (skillCount < 10) {
            setSkillCount(skillCount + 1);
        }
    };

    const addEducation = () => {
        if (educationCount < 10) {
            setEducationCount(educationCount + 1);
        }
    };
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleGalleryFilesUpload = (event) => {
        const files = Array.from(event.target.files);
        setGalleryFiles([...galleryFiles, ...files].slice(0, 10)); // Ensuring we never exceed 10 files
    };
    const addMedia = () => {
        if (mediaCount < 10) {
            setMediaCount(mediaCount + 1);
        }
    };

    const handleGalleryImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setGalleryImages([...galleryImages, ...files]);
    };

    return (
        <Container>
            <GlobalStyle />
            <Card>
                <Header>
                    <Title>{userType === 'applicant' ? "Applicant Profile" : "Company Profile"}</Title>
                </Header>
                <ProfilePictureContainer>
                    {profilePic ?
                        <ProfilePicture src={profilePic} alt="Profile" /> :
                        <ProfileImage>
                            <ImageUploadIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M21 2H3C1.895 2 1 2.895 1 4v16c0 1.105 0.895 2 2 2h18c1.105 0 2-0.895 2-2V4c0-1.105-0.895-2-2-2zm-1 18H4V4h16.003L20 20zM11 6.414l-2.293 2.293-1.414-1.414L11 3.586l4.707 4.707-1.414 1.414L13 6.414V13h-2V6.414z" />
                            </ImageUploadIcon>
                        </ProfileImage>                  }
                    <UploadInput type="file" accept="image/*" onChange={handleProfilePicChange} />
                </ProfilePictureContainer>
                {/* Personal Details */}
                <h2>Personal Details</h2>
                <Input type="text" placeholder="Full Name" />
                <Input type="text" placeholder="Location (City, Country)" />
                <Input type="text" placeholder="Date of Birth" />
                <Input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" />
                <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                <TextArea placeholder="Brief About Me (max 100 words)" rows="4" />

                {/* Experience */}
                <h2>Experience</h2>
                {Array.from({ length: experienceCount }).map((_, idx) => (
                    <div key={idx}>
                        <Input type="text" placeholder={`Company Name ${idx + 1}`} />
                        <Input type="text" placeholder={`Role Title ${idx + 1}`} />
                        <Input type="date" placeholder={`From Date ${idx + 1}`} />
                        <Input type="date" placeholder={`To Date ${idx + 1}`} />
                        <TextArea placeholder={`Responsibilities & Achievements ${idx + 1}`} rows="3" />
                    </div>
                ))}
                <Button onClick={addExperience}>Add Experience</Button>

                {/* Skills */}
                <h2>Skills & Endorsements</h2>
                {Array.from({ length: skillCount }).map((_, idx) => (
                    <Input key={idx} type="text" placeholder={`Skill ${idx + 1}`} />
                ))}
                <Button onClick={addSkill}>Add Skill</Button>

                {/* Education */}
                <h2>Education</h2>
                {Array.from({ length: educationCount }).map((_, idx) => (
                    <div key={idx}>
                        <select>
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
                {Array.from({ length: mediaCount }).map((_, idx) => (
                    <div key={idx}>
                        <select>
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
                        <GalleryImage key={idx} src={URL.createObjectURL(file)} alt={`Gallery Image ${idx + 1}`} />
                    ))}
                </GalleryContainer>
                {galleryFiles.length < 10 && (
                    <>
                        <Input type="file" multiple onChange={handleGalleryFilesUpload} style={{ display: 'none' }} id="gallery-upload" />
                        <label htmlFor="gallery-upload" style={{ display: 'block', textAlign: 'center', cursor: 'pointer', color: '#667eea' }}>
                            Upload Gallery Images
                        </label>
                    </>
                )}

                <Button>Save Profile</Button>
            </Card>
        </Container>
    );
};
export default ProfileUpdate;