import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import  Features  from "../components/Features";
import About  from "../components/About";
import ContactUs from "../components/ContactUs";
import StudentDashboard from "../pages/student/StudentDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/student/dashboard" element={<StudentDashboard/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;