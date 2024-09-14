
import React, { useState } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import RegisterPage from './Components/RegisterPage';
import LoginPage from "./Components/LoginPage";
import AdminPage from "./Components/AdminPage";
import UserPage from "./Components/UserPage";
import TotalUsers from "./Components/TotalUsers";
import AddPlant from "./Components/AddPlant";
import ViewAllPlants from "./Components/ViewAllPlants";
import PlantDiseaseDetector from "./Components/PlantDiseaseDetector";
import AddDisease from "./Components/AddDisease";
import ViewPlantDiseases from "./Components/ViewPlantDiseases";
import ManageDisease from "./Components/ManageDisease";
import ManagePlant from "./Components/ManagePlant";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div>
      <BrowserRouter>
      <Routes>
<Route path="/registerPage" element={<RegisterPage/>}></Route>
<Route path="/" element={<LoginPage setUserId={setUserId} />}></Route>
<Route path="/adminPage" element={<AdminPage/>}></Route>
<Route path="/userPage" element={<UserPage id={userId}/>}></Route>
<Route path="/totalUsers" element={<TotalUsers/>}></Route>
<Route path="/addPlant" element={<AddPlant/>}></Route>
<Route path="/viewAllPlants" element={<ViewAllPlants/>}></Route>
<Route path="/plantDiseaseDetector" element={<PlantDiseaseDetector/>}></Route>
<Route path="/addDisease" element={<AddDisease/>}></Route>
<Route path="/viewPlantDiseases" element={<ViewPlantDiseases/>}></Route>
<Route path="/manageDisease" element={<ManageDisease/>}></Route>
<Route path="/managePlant" element={<ManagePlant/>}></Route>

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

