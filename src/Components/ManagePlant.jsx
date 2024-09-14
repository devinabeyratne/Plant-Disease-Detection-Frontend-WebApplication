import React, { useState, useEffect } from 'react';
import { FaLeaf, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';
import './view.css'; // Assuming you have a consistent style

const ManagePlant = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the plant diseases from the backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/view_all_plants', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPlants(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch plant data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      }
    };

    fetchPlants();
  }, []);

  // Function to handle deleting a plant disease
  const handleDelete = async (plantId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this plant?');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/delete_plants/${plantId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Update the list after deletion
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
        alert('Plant deleted successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete plant');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while trying to delete the plant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-all-plants-container">
      <h1>All Plants</h1>
      <div className="plants-list">
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.id} className="plant-card">
              <h2><FaLeaf /> {plant.plantName}</h2>
              <p><FaInfoCircle /> {plant.description}</p>
              {plant.image && (
                <div className="plant-image-container">
                  <img src={plant.image} alt={plant.plantName} />
                </div>
              )}
              <button 
                className="delete-button" 
                onClick={() => handleDelete(plant.id)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          ))
        ) : (
          <p>No plant available.</p>
        )}
      </div>
    </div>
  );
};

export default ManagePlant;
