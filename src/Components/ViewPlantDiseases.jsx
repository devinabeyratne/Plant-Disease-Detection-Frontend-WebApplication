import React, { useState, useEffect } from 'react';
import { FaBug, FaLeaf, FaInfoCircle } from 'react-icons/fa';
import './view.css'; // Use the same styles as the AddPlant component for consistency

const ViewPlantDiseases = () => {
  const [disease, setDisease] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/view_plants_disease', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setDisease(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch plant disease data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      }
    };

    fetchDisease();
  }, []);

  return (
    <div className="view-all-plants-container">
      <h1>All Plant Diseases</h1>
      <div className="plants-list">
        {error && <p className="error-message">{error}</p>}
        {!error && disease.length > 0 ? (
          disease.map((plant) => (
            <div key={plant.id} className="plant-card">
              <h2><FaLeaf /> {plant.plantName}</h2>
              <h2><FaBug /> {plant.diseaseName}</h2>
              <p><FaInfoCircle /> {plant.description}</p>
              {plant.image && (
                <div className="plant-image-container">
                  <img src={plant.image} alt={plant.plantName} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No plant diseases available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPlantDiseases;
