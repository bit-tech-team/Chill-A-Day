import React from 'react';
import "./Banner.scss";
import logo from "../../assets/img/logo/Shakar.png"
export default function Banner() {
  return (
      <div className='container-banner'>
          <div className='container-banner__content'>
              <a href='https://github.com/Bit-Tech-Team'>
              <img src={logo} alt='banner'/>
              </a>
              
          </div>
      </div>
  );
}
