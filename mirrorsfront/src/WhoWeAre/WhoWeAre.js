import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaSearch, FaAd,FaUsers,FaBuilding,FaCode, FaDatabase, FaRegLightbulb } from 'react-icons/fa';
import AudioPlayer from 
        "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import './Theme.css';
import soundFile from '../assets/TonnyRobbins.mp3';


const WhoWeAreStyles = `
body {
    background: linear-gradient(120deg, #fdd835, #fff9c4);
}
.container {
    background: linear-gradient(120deg, #fdd835, #fff9c4);
    padding: 20px;
}

.section {
    margin-bottom: 40px;
}

h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

p, ul {
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
}

ul {
    list-style: disc inside;
}

li {
    margin-bottom: 10px;
}

.fa {
    margin-right: 15px;
    color: #333;
}
.container {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
}
.audio-player-container {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 60px;  /* Adjust as needed */
}
.features {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}

.feature {
    flex: 1;
    margin: 0 1rem;
    text-align: center;
}

h1, h2 {
    color: #333;
}

p {
    color: #555;
}

.react-h5-audio-player {
    margin-top: 2rem;
}
`;

function WhoWeAre() {
    const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

    return (
        <div className="container">
            <div className="audio-player-container">
                <AudioPlayer
                    autoPlay={false}
                    src={soundFile}
                    showJumpControls={false}
                    customAdditionalControls={[]}
                    layout="horizontal-reverse"
                    customVolumeControls={[]}
                    customProgressBarSection={[]}
                />
            </div>

            <div className="section">
                <animated.div style={fade}>
                    <FaUsers size={50} />
                    <h1>The World Of Mirrors</h1>
                    <p>Developed by Bar and Dor, WoM revolutionizes job searching by leveraging insights from DNA research and the rise in ADHD cases, ensuring job seekers and companies connect effortlessly.</p>
                </animated.div>
            </div>

            <div className="section">
                <animated.div style={fade}>
                    <FaSearch size={50} />
                    <h1>Problems We Solve</h1>
                    <p>Tired of the inefficient job search? WoM cuts through the noise and offers a streamlined, efficient, and focused approach for both job seekers and employers.</p>
                </animated.div>
            </div>

            <div className="section">
                <animated.div style={fade}>
                    <FaAd size={50} />
                    <h1>Mirror - Our Solution</h1>
                    <p>Inspired by dating apps, Mirror is a game-changing platform where applicants find jobs and companies discover candidates. It's all about continuous improvement and appeal!</p>
                </animated.div>
            </div>

            <div className="section">
                <animated.div style={fade}>
                    <FaCode size={50} />
                    <h1>Implementation</h1>
                    <ul>
                        <li><b>Backend:</b> Node.js & Microservices Architecture with Express.</li>
                        <li><b>Frontend:</b> React for dynamic UI interactions.</li>
                        <li><b>Database:</b> NoSQL (MongoDB) for efficient data management.</li>
                    </ul>
                </animated.div>
            </div>

            <div className="section">
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
            </div>

            <div className="section">
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
            </div>

            <div className="section">
                <animated.div style={fade}>
                    <FaBuilding size={50} />
                    <h1>Conclusion</h1>
                    <p>The World Of Mirrors strives to redefine the job search and hiring landscape. By harnessing advanced technologies and a unique approach, WoM promises a future of lasting professional connections and success.</p>
                </animated.div>
            </div>
        </div>
    );
}

export default WhoWeAre;