import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import SellersDetailsPage from "./pages/SellersDetailsPage";
import SellersPage from "./pages/SellersPage";
import DepartmentDetailsPage from "./pages/DepartmentsDetailsPage";
import SellersEditPage from "./pages/SellersEditPage";
import DepartmentEditPage from "./pages/DepartmentEditPage";
import SalesPage from "./pages/SalesPage";
import GroupSalesPage from "./pages/GroupSalesPage";
import SimpleSalesPage from "./pages/SimpleSalesPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route
        path="/departments/detalhes/:id"
        element={<DepartmentDetailsPage />}
      />
      <Route path="/departments/editar/:id" element={<DepartmentEditPage />} />
      <Route path="/sellers" element={<SellersPage />} />
      <Route path="/sellers/details/:id" element={<SellersDetailsPage />} />
      <Route path="/sellers/edit/:id" element={<SellersEditPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/sales/simple" element={<SimpleSalesPage />} />
      <Route path="/sales/group" element={<GroupSalesPage />} />
    </Routes>
  );
}

export default App;
