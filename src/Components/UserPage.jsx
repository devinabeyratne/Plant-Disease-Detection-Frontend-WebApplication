import React from 'react';
import {NavLink, useLocation } from 'react-router-dom';
import Logout from './Logout';
import './styles.css'; // Import CSS file
import samplePhoto from './g.webp'; // Import your sample photo
import samplePhoto1 from './j.jpg'; // Import your sample photo
import samplePhoto2 from './h.jpg'; // Import your sample photo
import samplePhoto3 from './i.jpg'; // Import your sample photo

const UserPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');

  return (
    <div className="user-page">
      <div className="header">
        {/* Navigation Bar */}
<nav className="navbar">
        <ul>
          
          
          <li>
            <NavLink
              to="/PlantDiseaseDetector"
              end // `exact` replaced with `end` in v6 for exact matching
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Plant Disease Detector
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/ViewAllPlants"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              View Plants
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/ViewPlantDiseases"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              View Plant Diseases
            </NavLink>
          </li>
        </ul>
      </nav>
        <h2>Welcome, {firstName} {lastName}!</h2>
        <Logout className="logout-button" />
      </div>
      {/* Hero Section */}
      <div className="hero-section">
        <img
          src={samplePhoto}
          
          alt="Agriculture and technology"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Revolutionizing Agriculture with AI</h1>
          <p>
            Our Plant Disease Detection Tool leverages state-of-the-art AI to detect plant diseases with
            unparalleled accuracy. Helping farmers maximize crop yield and minimize losses.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="content-section">
        <h2>How Does Plant Disease Detection Work?</h2>
        <p>
          Using deep learning algorithms, our system analyzes images of plants to identify diseases based on visual symptoms.
          The model is trained on thousands of images, learning to recognize the subtle differences between healthy and
          diseased plants. When you upload a plant image, the system processes it and provides a diagnosis within seconds.
        </p>
        <img
          src={samplePhoto1}
          alt="Plant disease detection"
          className="content-image"
        />
      </div>

      {/* Accuracy Section */}
      <div className="content-section">
        <h2>How Accurate Is the Detection?</h2>
        <p>
          Our AI model has an accuracy rate of over 96% in detecting common plant diseases, including:
        </p>
        <ul>
          <li>Potato Early Blight</li>
          <li>Potato Late Blight</li>
          <li>Tomato Yellow Leaf Curl Virus</li>
          <li>Tomato Septoria Leaf Spot</li>
          <li>Tomato Bacterial Spot</li>
          <li>Strawberry Leaf Scorch</li>
        </ul>
        <p>
          While the accuracy is high, we recommend multiple image submissions in cases of low confidence levels
          or unclear images.
        </p>
        <img
          src={samplePhoto2}
          alt="Healthy and diseased plants"
          className="content-image"
        />
      </div>

      {/* Agriculture and Technology Section */}
      <div className="content-section">
        <h2>The Role of AI in Modern Agriculture</h2>
        <p>
          With the growing global population, agricultural efficiency is more important than ever. By integrating AI into farming,
          we enable farmers to identify diseases early, prevent outbreaks, and improve yield. The future of agriculture lies in data-driven
          insights, and our platform is a key step towards that future.
        </p>
        <img
          src={samplePhoto3}
          alt="AI in agriculture"
          className="content-image"
        />
      </div>
      
    </div>
  );
};

export default UserPage;
