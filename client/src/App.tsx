import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import custom CSS for additional styles
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserDashboard from "./components/UserDashboard";
import ViewRecipe from "./components/ViewRecipe";
import AddRecipe from "./components/AddRecipe";
import UploadImage from "./components/UploadImage";
import UpdateRecipePage from "./components/UpdateRecipePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="background-image">
      <Header isLoggedIn={isLoggedIn} toggleDarkMode={toggleDarkMode} />
      <div className="main-body-wrapper">
        <div className="main-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <UserDashboard isLoggedIn={isLoggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/recipe/:recipeID"
              element={<ViewRecipe isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/add-recipe"
              element={
                isLoggedIn ? <AddRecipe /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/update-recipe"
              element={
                isLoggedIn ? <UpdateRecipePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/upload-image/:uniqueId"
              element={<UploadImage />}
            />
          </Routes>
         
     
          </div>
          
      </div>
      <Footer />
    </div>
  );
}

export default App;
