# Plant Disease Detection Web Application - Frontend

## Overview
This is the frontend for a plant disease detection web application built using **React.js**. It allows users to register, login, upload plant images for disease detection, manage plant and disease information, and view a dashboard. The frontend interacts with the backend via API calls and provides an easy-to-use interface for both users and administrators.

## Features
- **User Registration and Login**: Secure user authentication.
- **Admin and User Dashboards**: Separate views for administrators and regular users.
- **Plant Management**: Add, view, and manage plant information.
- **Disease Management**: Add, view, and manage plant diseases.
- **Disease Detection**: Upload plant images to detect diseases using a pre-trained model.
- **View Total Users**: Admin feature to view the total number of registered users.

## Technologies Used
- **React.js**: Frontend JavaScript library for building user interfaces.
- **React Router DOM**: For handling routing between different pages.
- **Axios**: For making HTTP requests to the backend API.
- **Bootstrap & MDB React UI Kit**: For responsive UI components.
- **TensorFlow.js**: For handling in-browser machine learning predictions.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://https://github.com/devinabeyratne/Plant-Disease-Detection-Frontend-WebApplication.git
    cd plant-disease-detection-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```

    The app will be available at `http://localhost:3000`.

## Pages and Routes

- **Register Page (`/registerPage`)**: Allows new users to register.
- **Login Page (`/`)**: Login page for existing users.
- **Admin Page (`/adminPage`)**: Admin dashboard to manage users, plants, and diseases.
- **User Page (`/userPage`)**: User dashboard after login.
- **Total Users (`/totalUsers`)**: Admin view to see the total number of users.
- **Add Plant (`/addPlant`)**: Page for adding plant information.
- **View All Plants (`/viewAllPlants`)**: Page to view all added plants.
- **Plant Disease Detector (`/plantDiseaseDetector`)**: Allows users to upload plant images for disease detection.
- **Add Disease (`/addDisease`)**: Page to add new plant diseases.
- **View Plant Diseases (`/viewPlantDiseases`)**: Page to view all plant diseases.
- **Manage Disease (`/manageDisease`)**: Admin feature to manage plant diseases.
- **Manage Plant (`/managePlant`)**: Admin feature to manage plants.

## Important Dependencies

- **Axios**: Used for API calls to interact with the backend.
- **React Router DOM**: Enables routing in the application.
- **Bootstrap & MDB React UI Kit**: Used for styling and responsiveness.
- **TensorFlow.js**: Handles image processing and plant disease detection within the browser.

## Scripts

- **npm start**: Runs the app in development mode on `http://localhost:3000`.
- **npm run build**: Builds the app for production to the `build` folder.
- **npm test**: Launches the test runner.
- **npm run eject**: If you need to customize the configuration, this will remove the default configurations.

## Notes

- Ensure the backend is running to allow the frontend to interact with it.
- The API endpoints for user registration, login, plant management, disease management, and prediction are available from the backend server running on port `5001` (or as configured).

## Future Improvements

- Add more plant and disease categories to extend the coverage.
- Improve the UI for better user experience.
- Implement role-based access control for more granular permissions.

---

This frontend application, when paired with the backend, provides a complete plant disease detection system that helps farmers and agricultural stakeholders identify and manage plant diseases efficiently.
