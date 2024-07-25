import React from 'react';
import './about.css';
import absarSiddiqui from '../image/absar-siddiqui.png';
import allenPader from '../image/allen-pader.png';
import kaWaiYim from '../image/ka-wai-yim.png';
import lissetteGorrin from '../image/lissette-gorrin.jpg';
import mohammadHossain from '../image/mohammad-hossain.png';
import robotChefLogo from '../image/Robot-Chef.png';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-logo">
          <img src={robotChefLogo} alt="Robot Chef Logo" />
        </div>
        <div className="about-text">
          <h1><b>ABOUT</b></h1>
          <p>
            Robot Chef is a web app designed to enhance cooking by offering personalized recipe recommendations, ingredient management, meal planning, and interactive cooking guides. Users can find recipes based on their preferences and available ingredients, track their pantry, and plan meals. Integration with smart kitchen devices and grocery delivery services aims to make cooking more efficient and enjoyable, promoting healthier eating habits and reducing food waste.
          </p>
        </div>
      </div>
      <div className="team-section">
        <h1><b>MEET THE TEAM</b></h1>
        <div className="team-container">
          <div className="team-member">
            <img src={absarSiddiqui} alt="Absar Siddiqui" />
            <h3><b>Absar Siddiqui</b></h3>
            <p>Security Programmer</p>
          </div>
          <div className="team-member">
            <img src={allenPader} alt="Allen Pader" />
            <h3><b>Allen Pader</b></h3>
            <p>UI Programmer & Secondary Frontend Developer</p>
          </div>
          <div className="team-member">
            <img src={kaWaiYim} alt="Ka Wai Yim" />  
            <h3><b>Ka Wai Yim</b></h3>
            <p>Project Manager & Primary Frontend Developer</p>
          </div>
          <div className="team-member">
            <img src={lissetteGorrin} alt="Lissette Gorrin" />
            <h3><b>Lissette Gorrin</b></h3>
            <p>Technical Artist & Web Designer</p>
          </div>
          <div className="team-member">
            <img src={mohammadHossain} alt="Mohammad Hossain" />  
            <h3><b>Mohammad Hossain</b></h3>
            <p>Backend Developer & Database Programmer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
