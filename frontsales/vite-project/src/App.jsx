import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import SellersDetailsPage from "./pages/SellersDetailsPage";
import SellersPage from "./pages/SellersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/sellers" element={<SellersPage />} />
      <Route path="/sellers/detalhes/:id" element={<SellersDetailsPage/>} />
    </Routes>
  );
}

export default App;
