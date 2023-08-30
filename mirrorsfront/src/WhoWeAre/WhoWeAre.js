import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { useSpring, animated } from 'react-spring';
import {
    FaSearch,
    FaAd,
    FaUsers,
    FaBuilding,
    FaCode,
    FaDatabase,
    FaRegLightbulb,
    FaBookmark,
    FaStar
} from 'react-icons/fa';
import AudioPlayer from 
        "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import './Theme.css';
import soundFile from '../assets/TonnyRobbins.mp3';
import {css} from "@emotion/react";



/* Base and theme styles */

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 18px; // Slightly larger base font size
  }
`;


const Container = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(120deg, ${theme.primary}, ${theme.secondary});
    padding: 3rem;
    max-width: 900px;
    margin: 2rem auto;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    transition: background 0.3s ease-in;

    @media only screen and (max-width: 768px) {
        padding: 1.5rem;
    }
  `}
`;

const Section = styled.div`
    margin-bottom: 60px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        background: rgba(253, 216, 53, 0.1);
        transform: translateY(-5px);
    }
`;
const hoverEffect = css`
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
    font-size: 2.2rem;
    margin-bottom: 15px;
    color: #444;
    font-weight: 600;

    @media only screen and (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Text = styled.p`
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
`;

const StyledUl = styled.ul`
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    list-style: none;
    padding-left: 0;
`;

const StyledLi = styled.li`
    margin-bottom: 15px;
    padding-left: 1.5rem;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background-color: #fdd835;
        border-radius: 50%;
    }
`;

const StyledFa = styled.div` // Assuming you will wrap your icons in this
    margin-right: 20px;
    color: #333;
    transition: transform 0.01s ease, color 0.01s ease , step-end 0.2s;

    &:hover {
        color: #fdd835;
        transform: rotate(1deg) scale(1.01);
    }

    @media only screen and (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const AudioPlayerContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 0px;
`;



function WhoWeAre() {
    const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

    return (
        <Container>
            <AudioPlayerContainer>
                <AudioPlayer
                    autoPlay={true}
                    src={soundFile}
                    showJumpControls={false}
                    customAdditionalControls={[]}
                    layout="horizontal-reverse"
                    customVolumeControls={[]}
                    customProgressBarSection={[]}
                />
            </AudioPlayerContainer>
            <Section>
                <animated.div style={fade}>
                   <FaUsers size={50} />
                    <h1>The World Of Mirrors</h1>
                    <p>Developed by Bar and Dor, WoM revolutionizes job searching by leveraging insights from DNA research and the rise in ADHD cases, ensuring job seekers and companies connect effortlessly.</p>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <FaSearch size={50} />
                    <Title>Advanced Search Features</Title>
                    <Text>WoM employs cutting-edge algorithms to provide you with results that truly matter, refining job matches to a fine art.</Text>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <StyledFa><FaCode size={50} /></StyledFa>
                    <Title>Integration Capabilities</Title>
                    <Text>WoM integrates effortlessly with your existing HR systems, making it a plug-and-play solution for businesses of all sizes.</Text>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <FaSearch size={50} />
                    <h1>Problems We Solve</h1>
                    <p>Tired of the inefficient job search? WoM cuts through the noise and offers a streamlined, efficient, and focused approach for both job seekers and employers.</p>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <StyledFa><FaDatabase size={50} /></StyledFa>
                    <Title>Data Privacy</Title>
                    <Text>We prioritize your privacy. Our encryption and data handling practices ensure your personal data remains confidential and protected.</Text>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <FaAd size={50} />
                    <h1>Mirror - Our Solution</h1>
                    <p>Inspired by dating apps, Mirror is a game-changing platform where applicants find jobs and companies discover candidates. It's all about continuous improvement and appeal!</p>
                </animated.div>
            </Section>

            <Section>
                <animated.div style={fade}>
                    <FaCode size={50} />
                    <h1>Implementation</h1>
                    <ul>
                        <li><b>Backend:</b> Node.js & Microservices Architecture with Express.</li>
                        <li><b>Frontend:</b> React for dynamic UI interactions.</li>
                        <li><b>Database:</b> NoSQL (MongoDB) for efficient data management.</li>
                    </ul>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <StyledFa><FaStar size={50} /></StyledFa>
                    <Title>Top Employers</Title>
                    <Text>Discover top employers in your industry and get exclusive insights into their work culture.</Text>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <FaBookmark size={50} />
                    <Title>Save For Later</Title>
                    <Text>Bookmark jobs and opportunities to review and apply at your convenience.</Text>
                </animated.div>
            </Section>
            <Section>
                <animated.div style={fade}>
                    <FaDatabase size={50} />
                    <h1>Microservices Architecture</h1>
                    <ul>
                        <li><b>User Interface Microservice:</b> Handles profile updates, swiping, and engagement.</li>
                        <li><b>Adapter Microservice:</b> Bridges applicants and HR representatives.</li>
                        <li><b>Database Microservice:</b> Manages all database operations.</li>
                        <li><b>Login Microservice:</b> Handles authentication and JWT-based security.</li>
                    </ul>
                </animated.div>
            </Section>

            <Section>
                <animated.div style={fade}>
                    <FaRegLightbulb size={50} />
                    <h1>Key Features</h1>
                    <ul>
                        <li>Easy profile creation and updating for job seekers.</li>
                        <li>Intuitive job discovery.</li>
                        <li>Swipe right to apply!</li>
                        <li>Real-time updates and efficient filtering for companies.</li>
                    </ul>
                </animated.div>
            </Section>

            <Section>
                <animated.div style={fade}>
                    <FaBuilding size={50} />
                    <h1>Conclusion</h1>
                    <p>The World Of Mirrors strives to redefine the job search and hiring landscape. By harnessing advanced technologies and a unique approach, WoM promises a future of lasting professional connections and success.</p>
                </animated.div>
            </Section>
        </Container>
    );
}

export default WhoWeAre;