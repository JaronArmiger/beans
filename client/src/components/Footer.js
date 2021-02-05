import React from 'react';
import logo from '../images/pilsen_logo3.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <hr />
          <div className="d-flex flex-wrap my-5 justify-content-between align-items-center">
            <img 
              src={logo} 
              alt="logo" 
              style={{ 
                width: '200px',
                height: 'auto',
                padding: '15px 0px',
              }}
            />
            <p
              style={{
                color: '#AAA',
              }}
            >
              site designed and created by Jaron Armiger
            </p>
          </div>
          <hr />
        </div>
      </div>
    </footer>
  )
}

export default Footer;