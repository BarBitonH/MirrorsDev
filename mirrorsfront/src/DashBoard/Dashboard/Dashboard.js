import React, { useState, useEffect } from 'react';
import Sidebar from '../SideBar/SideBar.js';
import ProfileInfo from '../ProfileInfo/ProfileInfo.js';
import Gallery from '../Gallery/Gallery.js';
import Modal from '../Modal/Modal.js';
import Notifications from '../Notifications/Notifications';
import Metrics from '../Metrics/Metrics';
import './Dashboard.css';
import LoadingPage from "../../LoadingPage/LoadingPage.js";
import axios from "axios";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedModalContent, setSelectedModalContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.post('http://localhost:3000/dbRouter/db/find',{
                    queryTitle:'internal_axon_id',
                    queryData:localStorage.getItem('internal_axon_id')
                },{headers: {
                        db: 'Users',
                        collection: 'User_profile',
                        x_mir_token: localStorage.getItem('x_mir_token')
                    }
                });

                if (response.status !== 200) {
                    throw new Error("Couldn't fetch user data");
                }
                setUserData(response.data.data.profileData);
                console.log(response.data.data.profileData)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (isLoading) return <LoadingPage />;

    const openModal = (content) => {
        setSelectedModalContent(content);
    }

    const closeModal = () => {
        setSelectedModalContent(null);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard">
            <Sidebar onLinkClick={openModal} />

            <div className="dashboard-main">
                {selectedModalContent && <Modal content={selectedModalContent} onClose={closeModal} />}

                <ProfileInfo data={userData.profile} />
                <Gallery images={userData.galleryImages} />

                {/* Display notifications if they exist */}
                {userData.notifications && <Notifications list={userData.notifications} />}

                {/* Display metrics if they exist */}
                {userData.metrics && <Metrics data={userData.metrics} />}

                {/* Add more components as needed */}
            </div>
        </div>
    );
}

export default Dashboard;
