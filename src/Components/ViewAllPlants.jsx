import React, { useState, useEffect } from 'react';
import { FaLeaf, FaInfoCircle } from 'react-icons/fa';
import './view.css'; // Use the same styles as the AddPlant component for consistency


const ViewAllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/view_all_plants', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Ensure cookies are sent with the request
        });

        if (response.ok) {
          const data = await response.json();
          setPlants(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch plants data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      }
    };

    fetchPlants();
  }, []);

  

  return (
    <div className="view-all-plants-container">
      <h1>All Plants</h1>
      <div className="plants-list">
        {error && <p className="error-message">{error}</p>}
        {!error && plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.id} className="plant-card" >
              <h2><FaLeaf /> {plant.plantName}</h2>
              <p><FaInfoCircle /> {plant.description}</p>
              {plant.image && (
                <div className="plant-image-container">
                  <img src={plant.image} alt={plant.plantName} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No plants available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllPlants;
