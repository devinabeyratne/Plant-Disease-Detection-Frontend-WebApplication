import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './PlantDiseaseDetector.css'; // Import CSS file
import samplePhoto from './1.png'; // Update path as necessary

const classNames = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
                    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 
                    'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 
                    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 
                    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 
                    'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
                    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 
                    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 
                    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 
                    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 
                    'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 
                    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 
                    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
                    'Tomato___healthy'];

const PlantDiseaseDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(selectedFile);
    imageElement.width = 128;
    imageElement.height = 128;
    document.body.appendChild(imageElement);

    const image = tf.browser.fromPixels(imageElement);
    const resizedImage = tf.image.resizeBilinear(image, [128, 128]);
    const normalizedImage = resizedImage.div(255.0).expandDims(0);

    try {
      const model = await tf.loadLayersModel('/trained_model.keras');
      const predictions = model.predict(normalizedImage);
      const resultIndex = predictions.argMax(1).dataSync()[0];
      setPrediction(classNames[resultIndex]);
      document.body.removeChild(imageElement); // Clean up
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
          <div className="input-container">
            <label>Select Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Predict</button>
        </form>
        {prediction && (
          <div>
            <h2>Prediction Result</h2>
            <p>{prediction}</p>
          </div>
        )}
      </header>
      <div className="photo-container">
        <img src={samplePhoto} alt="Sample" className="photo" />
      </div>
    </div>
  );
}

export default PlantDiseaseDetector;
