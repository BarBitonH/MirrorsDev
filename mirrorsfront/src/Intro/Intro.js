import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import introVoice from '../assets/introVoice.mp3'

// Keyframes for animations
const invisibleButton = styled.div`
    opacity: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: -1000;  // Ensures it's above other elements
`

const bgAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const flipIn = keyframes`
  0% {
    opacity: 0.5;
    transform: rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #fdd835, 0 0 15px #fdd835;
  }
  50% {
    text-shadow: 0 0 15px #fdd835, 0 0 25px #fdd835, 0 0 35px #fdd835;
  }
`;

const shine = keyframes`
  0%, 100% {
    background-position: -500% center;
  }
  50% {
    background-position: 500% center;
  }
`;

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
`;

const moveParticles = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(120deg, #fdd835, #fff9c4, #fdd835, #fff9c4);
  background-size: 400% 400%;
  animation: ${bgAnimation} 10s infinite;
  overflow: hidden;
  perspective: 1500px;
  position: relative;
`;
const InvisibleButton = styled.div`
    opacity: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 1000;  // Ensures it's above other elements
  `;
const Star = styled.span`
  position: absolute;
  top: ${(props) => `${props.top}%`};
  left: ${(props) => `${props.left}%`};
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: #fdd835;
  border-radius: 50%;
  opacity: 0.7;
  animation: ${twinkle} ${(props) => `${props.duration}s`} infinite alternate;
`;

const IntroBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4em;
  overflow: hidden;
`;

const zoomIn = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(3);  // Adjust as needed for desired "close up" effect
    opacity: 0;
  }
`;

const Letter = styled.span`
  display: inline-block;
  font: bold 100px "Helvetica Neue", sans-serif;
  color: white;
  letter-spacing: -8px;
  transform-origin: center;
  animation: ${flipIn} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
  ${pulse} 1.5s infinite alternate,
  ${zoomIn} 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.5s forwards;  // Starts zoom-in after 2.5s
  animation-delay: ${props => props.delay};
`;



const Gradient = styled.span`
  position: absolute;
  top: 0;
  width: 500%;
  height: 100%;
  background: linear-gradient(90deg, transparent 20%, rgba(253, 216, 53, 0.4) 25%, rgba(255, 249, 196, 0.8) 30%, rgba(253, 216, 53, 0.4) 35%, transparent 40%);
  animation: ${shine} 2s ease-in-out infinite;
`;
const Particle = styled.span`
  position: absolute;
  background-color: #f0f0f0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  opacity: 0.8;
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  animation: ${moveParticles} 3s ease-in-out infinite;
`;

// Main component
const Intro = () => {
    const navigate = useNavigate();
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };
    const letters = ['M', 'I', 'R', 'R', 'O', 'R', 'S'];
    const particles = [...Array(50)].map((_, idx) => ({
        x: Math.random() * 100,
        y: Math.random() * 100
    }));

    const stars = [...Array(50)].map((_, idx) => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 1
    }));
    const audioRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/WelcomePage');
        }, 4000);
        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate]);








    return (
        <Container>
            <InvisibleButton onClick={playAudio}></InvisibleButton>
            {stars.map((star, index) => (
                <Star key={index} {...star} />
            ))}

            <IntroBox>
                {letters.map((letter, index) => (
                    <Letter key={index} delay={`${index * 0.2}s`}>
                        {letter}
                    </Letter>
                ))}

                {particles.map((particle, index) => (
                    <Particle key={index} {...particle} />
                ))}

                <Gradient />
            </IntroBox>
            <audio ref={audioRef} src={introVoice} preload="auto" />
        </Container>
    );
};

export default Intro;
