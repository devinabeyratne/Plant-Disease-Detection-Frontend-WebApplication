import React, { useState, useEffect } from 'react';
import { FaBug, FaLeaf, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';
import './view.css'; // Assuming you have a consistent style

const ManageDisease = () => {
  const [disease, setDisease] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the plant diseases from the backend
  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/view_plants_disease', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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

  // Function to handle deleting a plant disease
  const handleDelete = async (diseaseId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this plant disease?');
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/delete_plant_disease/${diseaseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Update the list after deletion
        setDisease((prevPlants) => prevPlants.filter((plant) => plant.id !== diseaseId));
        alert('Plant disease deleted successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete plant disease');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while trying to delete the plant disease.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-all-plants-container">
      <h1>All Plant Diseases</h1>
      <div className="plants-list">
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && disease.length > 0 ? (
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
              <button 
                className="delete-button" 
                onClick={() => handleDelete(plant.id)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          ))
        ) : (
          <p>No plant diseases available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageDisease;
