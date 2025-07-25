import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DepartmentsPage from "./pages/DepartmentsPage";
<<<<<<< HEAD

import SellersPage from "./pages/SellersPage";
=======
import DepartmentsCreate from "./pages/DepartmentsCreate";
>>>>>>> 6737ed392f228d25fde9c7afcce7c83b7f582861
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
<<<<<<< HEAD
      <Route path="/sellers" element={<SellersPage />} />
=======
      <Route path="/departments/create" element={<DepartmentsCreate />} />
>>>>>>> 6737ed392f228d25fde9c7afcce7c83b7f582861
       
    </Routes>
  );
}

export default App;
