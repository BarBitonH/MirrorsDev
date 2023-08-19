import React from 'react';
import styled from 'styled-components';

const HeaderComponent = styled.div`
    grid-column: 1 / 3;
    background-color: #222;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const Logo = styled.h1`
    font-size: 1.5rem;
`;

const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

function Header({ userData }) {
    return (
        <HeaderComponent>
            <Logo>My Dashboard</Logo>
            <ProfilePicture src={userData.profilePic} alt="Profile" />
        </HeaderComponent>
    );
}

export default Header;
