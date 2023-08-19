import React, { useState } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #FFF8E1; 
  }
`;

const ProfilePictureContainer = styled.div`
  position: relative;
  width: 130px;  
  height: 130px;
  border-radius: 50%;
  margin: 0 auto 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #f4c542; 

  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }
`;


const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out; 
`;

const UploadInput = styled.input`
  position: relative;
  top: 0;
  left: 0;
  width: 130px;
  height: 130px;
  opacity: 0;
  cursor: pointer;
`;



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400vh;
  padding: 20px;
`;
const Card = styled.div`
  width: 50%;
  background: white;
  border-radius: 15px; 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); 
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
  color: #FFC107;
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
  border-radius: 7px; 
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

const CompanyUpdate  = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null);
    const [userType, setUserType] = useState('company');
    const [events, setEvents] = useState([{ title: '', date: '', description: '' }]);
    const [collabs, setCollabs] = useState([{ collaboration: '' }]);
    const [awards, setAwards] = useState([{ award: '' }]);
    const [testimonials, setTestimonials] = useState([{ testimonial: '' }]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [contactEmail, setContactEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [socialLinks, setSocialLinks] = useState({ twitter: '', linkedin: '', facebook: '', instagram: '' });
    const [companySize, setCompanySize] = useState('');
    const [specialties, setSpecialties] = useState('');
    const [services, setServices] = useState([]);

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => setProfilePic(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const addService = () => {
        setServices([...services, '']);
    };


    const handleServiceChange = (e, index) => {
        const updatedServices = [...services];
        updatedServices[index] = e.target.value;
        setServices(updatedServices);
    };

    const addEvent = () => {
        setEvents([...events, { title: '', date: '', description: '' }]);
    };


    const addCollab = () => {
        setCollabs([...collabs, { collaboration: '' }]);
    };


    const addAward = () => {
        setAwards([...awards, { award: '' }]);
    };

    const addTestimonial = () => {
        setTestimonials([...testimonials, { testimonial: '' }]);
    };
    const handleTestimonialChange = (index, value) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index].testimonial = value;
        setTestimonials(newTestimonials);
    };
    const handleEventChange = (index, key, value) => {
        const newEvents = [...events];
        newEvents[index][key] = value;
        setEvents(newEvents);
    };
    const handleAwardChange = (index, value) => {
        const newAwards = [...awards];
        newAwards[index].award = value;
        setAwards(newAwards);
    };
    const handleCollabChange = (index, value) => {
        const newCollabs = [...collabs];
        newCollabs[index].collaboration = value;
        setCollabs(newCollabs);
    };
    const handleGalleryFilesUpload = (event) => {
        const files = Array.from(event.target.files);
        setGalleryImages([...galleryImages, ...files]);
    };
    const saveProfileToDatabase = async () => {
        try {
            const profileData = {
                internal_axon_id: localStorage.getItem('internal_axon_id'),
                profileData: {
                    profilePicture: profilePic,
                    userType: userType,
                    events: events,
                    collabs: collabs,
                    awards: awards,
                    testimonials: testimonials,
                    galleryImages: galleryImages.map(file => URL.createObjectURL(file)), // Convert files to URLs
                    contactEmail: contactEmail,
                    phoneNumber: phoneNumber,
                    website: website,
                    socialLinks: socialLinks,
                    companySize: companySize,
                    specialties: specialties,
                    services: services
                }
            };
            const token = localStorage.getItem('x_mir_token');
            const response = await axios.post('http://localhost:3000/dbRouter/db/insert', profileData,
                {headers:{
                        'x_mir_token':token,
                        db:'Users',
                        collection:'User_profile'
                }});
            if(response.status === 200){
                navigate('/CompanyDashboard')
            }
            console.log("Data saved successfully:", response.data);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return (
        <Container>
            <GlobalStyle/>
            <Card>
                <Header>
                    <Title>Company Profile</Title>
                </Header>
                <ProfilePictureContainer>
                    <ProfilePicture src={profilePic || "https://via.placeholder.com/150"} alt="Company Logo" />
                    <UploadInput type="file" accept="image/*" onChange={handleProfilePicChange} />
                </ProfilePictureContainer>
                <Subtitle>Company Details</Subtitle>
                <Input type="text" placeholder="Company Name" />
                <Input type="text" placeholder="Location (City, Country)" />
                <Input type="text" placeholder="Date Established" />
                <TextArea placeholder="About the Company"></TextArea>

                <Subtitle>Contact Information</Subtitle>
                <Input type="email" placeholder="Company Email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
                <Input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                <Input type="url" placeholder="Company Website" value={website} onChange={e => setWebsite(e.target.value)} />

                <Subtitle>Social Media Profiles</Subtitle>
                <Input type="url" placeholder="Twitter Profile" value={socialLinks.twitter} onChange={e => setSocialLinks({ ...socialLinks, twitter: e.target.value })} />
                <Input type="url" placeholder="LinkedIn Profile" value={socialLinks.linkedin} onChange={e => setSocialLinks({ ...socialLinks, linkedin: e.target.value })} />
                {/* Add other social media inputs here if needed */}

                <Subtitle>Company Specialties</Subtitle>
                <Input type="text" placeholder="Company Size" value={companySize} onChange={e => setCompanySize(e.target.value)} />
                <TextArea placeholder="Specialties (e.g. E-commerce, SaaS)" value={specialties} onChange={e => setSpecialties(e.target.value)} />

                <Subtitle>Services/Products Offered</Subtitle>
                {services.map((service, idx) => (
                    <div key={idx}>
                        <Input type="text" placeholder={`Service ${idx + 1}`} value={service} onChange={e => handleServiceChange(e, idx)} />
                    </div>
                ))}
                <button onClick={addService}>Add Service</button>

                <Subtitle>Upcoming Events</Subtitle>
                {events.map((event, idx) => (
                    <div key={idx}>
                        <Input
                            type="text"
                            placeholder={`Event Title ${idx + 1}`}
                            value={event.title}
                            onChange={e => handleEventChange(idx, 'title', e.target.value)}
                        />
                        <Input
                            type="date"
                            placeholder={`Event Date ${idx + 1}`}
                            value={event.date}
                            onChange={e => handleEventChange(idx, 'date', e.target.value)}
                        />
                        <TextArea
                            placeholder={`Event Description ${idx + 1}`}
                            value={event.description}
                            onChange={e => handleEventChange(idx, 'description', e.target.value)}
                        ></TextArea>
                    </div>
                ))}
                <button onClick={addEvent}>Add Event</button>

                <Subtitle>Previous Collaborations</Subtitle>
                {collabs.map((collab, idx) => (
                    <Input
                        key={idx}
                        type="text"
                        placeholder={`Collaboration ${idx + 1}`}
                        value={collab.collaboration}
                        onChange={e => handleCollabChange(idx, e.target.value)}
                    />
                ))}
                <button onClick={addCollab}>Add Collaboration</button>

                <Subtitle>Company Awards</Subtitle>
                {awards.map((award, idx) => (
                    <Input
                        key={idx}
                        type="text"
                        placeholder={`Award ${idx + 1}`}
                        value={award.award}
                        onChange={e => handleAwardChange(idx, e.target.value)}
                    />
                ))}
                <button onClick={addAward}>Add Award</button>

                <Subtitle>Company Testimonials</Subtitle>
                {testimonials.map((testimonial, idx) => (
                    <TextArea
                        key={idx}
                        placeholder={`Testimonial ${idx + 1}`}
                        value={testimonial.testimonial}
                        onChange={e => handleTestimonialChange(idx, e.target.value)}
                    ></TextArea>
                ))}
                <button onClick={addTestimonial}>Add Testimonial</button>

                <Subtitle>Gallery</Subtitle>
                <GalleryContainer>
                    {galleryImages.map((file, idx) => (
                        <GalleryImage key={idx} src={URL.createObjectURL(file)} alt={`Gallery Image ${idx + 1}`} />
                    ))}
                </GalleryContainer>
                {galleryImages.length < 10 && (
                    <>
                        <UploadInput type="file" multiple onChange={handleGalleryFilesUpload} id="gallery-upload" />
                        <label htmlFor="gallery-upload">Upload Gallery Images</label>
                    </>
                )}
                <button onClick={saveProfileToDatabase}>Save Profile</button>
            </Card>
        </Container>
    );
}

    export default CompanyUpdate;