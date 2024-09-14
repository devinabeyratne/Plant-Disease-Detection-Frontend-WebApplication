import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope } from 'react-icons/fa';
import './PlantDiseaseDetector.css'; // Import CSS file
//import samplePhoto from './1.png'; // Update path as necessary

const PlantDiseaseDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [prediction, setPrediction] = useState('');
  const [confidenceScore, setConfidenceScore] = useState('');
  const [retakeMessage, setRetakeMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
    setPrediction(''); // Clear previous prediction
    setConfidenceScore(''); // Clear previous confidence score
    setRetakeMessage(''); // Clear previous retake message
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Include credentials in the request
      });

      if (response.data.message) {
        // If the backend sends a message (low confidence case)
        setConfidenceScore(response.data.confidence_score);
        setRetakeMessage(response.data.message);
        alert('Accuracy Level Low, Retake the Picture')
      } else {
        // If the backend sends prediction and confidence score
        setPrediction(response.data.prediction);
        setConfidenceScore(response.data.confidence_score);
        setRetakeMessage(''); // Clear retake message if confidence is high enough
        alert('Prediction Successful')
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Prediction failed. Please try again later.');
    }
  };

  return (
    <div className="PlantDiseaseDetector">
      <header className="PlantDiseaseDetector-header">
        <h1>Plant Disease Detector</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container1">
            <label className="lbl1">
              <FaEnvelope /> {/* Example icon */}
              Select Image:
            </label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button className="prediction-button" type="submit">Predict</button>
        </form>
        {imageUrl && (
          <div className="image-preview">
            <h2>Selected Image:</h2>
            <img src={imageUrl} alt="Selected" className="preview-image" />
          </div>
        )}
        {retakeMessage && confidenceScore && (
          <div>
            <h2>{retakeMessage}</h2>
            <p>Confidence Score: {confidenceScore}</p>
          </div>
        )}
        {prediction && confidenceScore && (
          <div>
            <h2>Prediction Result</h2>
            <p>Disease: {prediction}</p>
            <p>Confidence Score: {confidenceScore}</p>
          </div>
        )}
      </header>
      <div className="photo-container">
        {/*<img src={samplePhoto} alt="Sample" className="photo" /> */}
      </div>
    </div>
  );
}

export default PlantDiseaseDetector;
