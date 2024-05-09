// components/Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="footer fixed-bottom bg-dark text-white py-4">
      <div className="container-fluid">
        <span className="text-white">
          Cuisine Connect &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
