import React from 'react';
import '../components/css/AnimatedImage.css';
import logo from '../assets/logo192.png';

const AnimatedImage = () => {
  return (
    <div className="animated-image" >
      <img src={logo} alt="Animated Image" />
      <h1>Please wait</h1>
    </div>
  );
};

export default AnimatedImage;