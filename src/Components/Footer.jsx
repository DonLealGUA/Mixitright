import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './UI/Styles/Footer.css';  

const Footer = () => {
    const location = useLocation();  
  
    return (
      <footer className="footer">
        <div className="footer-content">
          <p>Made by Kristoffer Leal</p>
          {location.pathname === '/browse' && (
            <p className='Creditsource'>
              Icons made by <a className='Linksource' href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">Flaticon</a>
            </p>
            
          )}
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="https://www.linkedin.com/in/kristoffer-leal" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/DonLealGUA" className="footer-link" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;