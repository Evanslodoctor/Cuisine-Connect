import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, navigate to the dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to Cuisine Connect!</h1>
      <p>This is the home page of our recipe sharing platform.</p>
    </div>
  );
};

export default Home;
