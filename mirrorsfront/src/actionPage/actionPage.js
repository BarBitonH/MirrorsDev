import React, { useState, useEffect } from 'react';
import './actionPage.css';
import axios from 'axios';

const ActionPage = () => {
    const [userData, setUserData] = useState({
        userProfilePic: '',
        userSkills: [],
        userExp: [],
        CompEvents: [],
        gallery: [],
        Education: [],
        internalAxonId: '',
        internalJobId: ''
    });

    const fetchMeUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/adapterRouter/fetchAction/${localStorage.getItem('internal_axon_id')}`, {
                headers: {
                    authorization: localStorage.getItem('internal_axon_id')
                }
            });

            setUserData({
                userProfilePic: response.data.profilePic,
                userSkills: response.data.skills,
                gallery: response.data.gallery,
                userExp: response.data.exp,
                internalAxonId: response.data.internal_axon_id,
                internalJobId: response.data.internal_job_id
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        fetchMeUser();
    }, []);

    const handleHireButton = async () => {
        try {
            let internal_axon_id;
            let internal_job_id;

            if (localStorage.getItem('userType') === 'applicant') {
                internal_axon_id = localStorage.getItem('internal_axon_id');
                internal_job_id = userData.internalJobId;
            } else if (localStorage.getItem('userType') === 'company') {
                internal_axon_id = userData.internalAxonId;
                internal_job_id = localStorage.getItem('internal_axon_id');
            } else {
                console.error('No exists user type');
            }

            await axios.post('/adapterRouter/manageAction', {
                userType: localStorage.getItem('userType'),
                internal_axon_id: internal_axon_id,
                internal_job_id: internal_job_id,
                userAction: 'Right'
            });
            fetchMeUser();
        } catch (error) {
            console.error("There was an error with the Better Heart API call:", error);
        }
    }

    const handleDismissButton = async () => {
        try {
            const getUserForFetching = await axios.get('/your-api-endpoint-get-after-x');
            let internal_axon_id;
            let internal_job_id;

            if (localStorage.getItem('userType') === 'applicant') {
                internal_axon_id = localStorage.getItem('internal_axon_id');
                internal_job_id = getUserForFetching.data['internal_job_id'];
            } else if (localStorage.getItem('userType') === 'company') {
                internal_axon_id = getUserForFetching.data['internal_axon_id'];
                internal_job_id = localStorage.getItem('internal_axon_id');
            } else {
                console.error('No exists user type');
            }

            await axios.post('/adapterRouter/manageAction', {
                userType: localStorage.getItem('userType'),
                internal_axon_id: internal_axon_id,
                internal_job_id: internal_job_id,
                userAction: 'Left'
            });

            console.log(getUserForFetching.data);
        } catch (error) {
            console.error("There was an error with the X API call:", error);
        }
    }

    return (
        <div className="main-grid">
            <h1 className="header">Elegant Page</h1>
            <div className="footer-buttons">
                <button className="button heart-button" onClick={handleHireButton}>
                    ❤️
                </button>
                <button className="button x-button" onClick={handleDismissButton}>
                    ✖️
                </button>
            </div>
        </div>
    );
}

export default ActionPage;
