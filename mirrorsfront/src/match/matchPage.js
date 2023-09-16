import styled, { keyframes } from 'styled-components';
import React from 'react';
import shakeHands from '../assets/shakeHands.png'
const ParticleMotion = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(15px, 15px) scale(1.1);
  }
  50% {
    transform: translate(0, 30px) scale(0.9);
  }
  75% {
    transform: translate(-15px, 15px) scale(1.1);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
`;
const shine = keyframes`
  from {
    background-position: -200% center;
  }
  to {
    background-position: 200% center;
  }
`;

const rotate = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const tiltIn3D = keyframes`
  from {
    transform: perspective(500px) rotateY(-90deg);
    opacity: 0;
  }
  to {
    transform: perspective(500px) rotateY(0deg);
    opacity: 1;
  }
`;

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;
const HandshakeImage = styled.img`
  width: 300px; // Increase the size as per your preference
  height: auto;
  position: absolute;
  bottom: -10%;  // Push it a bit more up so it feels involved in the content
  left: 50%;
  transform: translateX(-50%);
  z-index: -50;
  opacity: 0.8;
`;
const starTwinkle = keyframes`
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${gradientShift} 10s infinite;
  background: radial-gradient(circle at center, #fff9c4, #fdd835, #fff9c4);
  background-size: 200% 200%;
  position: relative; // ensures positioning of child elements is relative to this container
  overflow: hidden;
  perspective: 1500px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;
const Handshake = styled.svg`
  width: 80px;
  height: 80px;
  fill: #fdd835;
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  animation: ${float} 3s infinite, ${rotate} 10s infinite;
  transition: transform 0.3s;
  &:hover {
    animation: ${pulse} 0.5s infinite;
  }
`;

const ShimmeringText = styled.h1`
  font-size: 4em;
  font-weight: bold;
  background: linear-gradient(90deg, #f3b534, #fdd835, #555555);
  background-size: 200% 200%;
  animation: ${tiltIn3D} 2s, ${shine} 2s infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  z-index: 2;
  text-shadow: 3px 3px 10px rgba(253, 216, 53, 0.4);
  transform-style: preserve-3d;
  transform: perspective(500px) rotateX(15deg);
`;

const Particle = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.isStar ? 'transparent url("path_to_star_image.png") center/contain no-repeat' : '#fff'};
  position: absolute;
  border-radius: 50%;
  animation: ${props => props.isStar ? starTwinkle : pulse} 3s infinite;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  transform-style: preserve-3d;
  animation: ${props => props.isStar ? starTwinkle : ParticleMotion} 3s infinite;

`;

class MatchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseX: 0,
            mouseY: 0
        }
    }

    handleMouseMove = (event) => {
        const { clientX: mouseX, clientY: mouseY } = event;
        this.setState({ mouseX, mouseY });
    }

    render() {
        const particles = [];
        for (let i = 0; i < 150; i++) {
            const size = Math.random() * (7 - 3) + 3;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const isStar = Math.random() > 0.8;
            particles.push(<Particle key={i} size={size} top={top} left={left} isStar={isStar} />);
        }

        const { mouseX, mouseY } = this.state;
        const lightDirection = {
            x: (window.innerWidth / 2 - mouseX) / 20,
            y: (window.innerHeight / 2 - mouseY) / 20
        }

        return (
            <Container onMouseMove={this.handleMouseMove} style={{ boxShadow: `${lightDirection.x}px ${lightDirection.y}px 40px rgba(0,0,0,0.2)` }}>
                {particles}
                <ShimmeringText>It's a Match!</ShimmeringText>
                <Handshake viewBox="0 0 24 24">
                    <path d='../assets/shakeHands.png'/>
                </Handshake>
                <HandshakeImage src={shakeHands} alt="Handshake" />
            </Container>
        );
    }
}

export default MatchPage;