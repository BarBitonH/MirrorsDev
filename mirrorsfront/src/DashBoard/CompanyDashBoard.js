import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Header, Sidebar, Notifications, UserStats,
    ProfileSection, SkillsSection, ExperiencesSection, EducationSection,
    GallerySection, MediaSection
} from './Sections';

const DashboardContainer = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 70px 1fr;
    height: 100vh;
`;

function Dashboard({ userId }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchUserData(userId);
                setUserData(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        loadData();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <DashboardContainer>
            <Header userData={userData} />
            <Sidebar />
            <Notifications notifications={userData.notifications} />
            <UserStats data={userData.stats} />
            <ProfileSection data={userData} />
            <SkillsSection skills={userData.skills} />
            <ExperiencesSection experiences={userData.experiences} />
            <EducationSection educations={userData.educations} />
            <GallerySection images={userData.galleryImages} />
            <MediaSection media={userData.media} />
        </DashboardContainer>
    );
}

export default Dashboard;
