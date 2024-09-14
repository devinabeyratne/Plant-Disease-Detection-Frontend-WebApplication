import React, { useState } from 'react';
import { FaLeaf, FaInfoCircle, FaImage } from 'react-icons/fa';
import './form.css';
import { useNavigate } from 'react-router-dom';

const AddPlant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plantName: '',
    description: '',
    image: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/add_plant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'  // Ensure cookies are sent with the request
      });

      if (response.ok) {
        setSuccess(true);
        alert('Plant added successfully');
        //navigate('/'); // Redirect to a different page if needed
      } else {
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to add plant');
        } else {
          // Handle HTML or other types of errors
          const errorText = await response.text();
          console.error('Error:', errorText);
          setError('Failed to add plant due to server error');
        }
        alert('Failed to add plant. Please check your inputs and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleCancel = () => {
    navigate('/'); // Navigate to a different page if user cancels the action
  };

  const validateForm = () => {
    const { plantName, description, image } = formData;

    if (!plantName || !description || !image) {
      alert('Please fill in all fields.');
      return false;
    }

    return true;
  };

  return (
    <div className="add-plant-container">
      <h1>Add New Plant</h1>
      <div className="add-plant-form-container">
        <div className="add-plant-form">
          
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Plant added successfully</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-container1">
              <label className={formData.plantName ? "positioned-label" : ""}>
                <FaLeaf /> {/* Icon for Plant Name */}
                Plant Name:
              </label>
              <input
                type="text"
                name="plantName"
                value={formData.plantName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container1">
              <label className={formData.description ? "positioned-label" : ""}>
                <FaInfoCircle /> {/* Icon for Description */}
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="input-container1">
              <label className={formData.image ? "positioned-label" : ""}>
                <FaImage /> {/* Icon for Image */}
                Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit">Add Plant</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
