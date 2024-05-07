// components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-light">
      <div className="container-fluid">
        <span className="text-muted">Cuisine Connect &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default Footer;
