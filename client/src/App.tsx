import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      <div className="background-image">
      <Header isLoggedIn={isLoggedIn} />
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
            element={<UserDashboard isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/recipe/:recipeID"
            element={<ViewRecipe isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        </div>
      
        <Footer />
        </div>
      
    </div>
  );
}

export default App;
