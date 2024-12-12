import React from 'react';
import './UI/Styles/Loader.css'; 

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loading-text">Loading cocktails...</p>
    </div>
  );
};

export default Loader;
