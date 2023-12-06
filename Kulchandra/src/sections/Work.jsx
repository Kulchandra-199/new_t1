import React, { useState, useRef, useEffect } from 'react';
import ludo from '../assets/images/ludo.png';
import fastcall from '../assets/images/fastcall.png';
import visionweb from '../assets/images/vision_web.png';
import dicot from '../assets/images/dicot.png';
import commerce from '../assets/images/e-commerce.png';
import '../App.css';
import url from "../assets/images/url.png";






const Work = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredImageStyle, setHoveredImageStyle] = useState({
    display: 'none',
    height: '200px',
    position: 'absolute',
  });
  const hideTimeout = useRef(null);


  const handleMouseMove = (event) => {
    const distance = 1; // Adjust this value to change the distance from the cursor
    const x = event.clientX;
    const y = event.clientY;

    const imageStyle = {
      display: 'block',
      left: `${x + distance}px`,
      top: `${y + distance}px`,
    };

    setHoveredImageStyle(imageStyle);
    clearTimeout(hideTimeout.current);
  };

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
    clearTimeout(hideTimeout.current);
  };

  const handleMouseLeave = () => {
    
      setHoveredImage(null);
      // Set the display style back to 'none' after the timeout
      setHoveredImageStyle({ display: 'none' });
    
  };
  const workList = [
    {
      title: 'Ludo King',
      company: 'Weberse Technologiess',
      year: 2023,
      hoverImage: ludo,
      link: "https://khelbro.com/"
    },
    {
      title: 'Fastcall.in',
      company: 'Weberse Technologiess',
      year: 2023,
      hoverImage: fastcall,
      link: "https://fastcall.in" // Change this to the respective hover image for Fastcall.in
    },
    
    {
        title: 'Vision web',
        company: 'Dicot Innovations',
        year: 2023,
        hoverImage: visionweb,
        link: "https://vision-web.tech/auth/login" // Change this to the respective hover image for Fastcall.in
      },
      {
        title: 'Dicot Website',
        company: 'Dicot Innovations',
        year: 2023,
        hoverImage: dicot,
        link:"https://www.dicot.tech/products.html"
         // Change this to the respective hover image for Fastcall.in
      },
      {
        title: 'E-commerce',
        company: 'personal',
        year: 2022,
        hoverImage: commerce,
        link: "https://peaceful-griffin-545687.netlify.app/" // Change this to the respective hover image for Fastcall.in
      },
      {
        title: 'App Landing Page',
        company: 'personal',
        year: "coming soon",
        hoverImage: commerce // Change this to the respective hover image for Fastcall.in
      },
      {
        title: 'Digital Products',
        company: 'personal',
        year: "coming soon",
        hoverImage: commerce // Change this to the respective hover image for Fastcall.in
      },
    
  ];


  return (
    <div className="works" onMouseMove={handleMouseMove}>
      {workList.map((item, index) => (
        <div className="work_list" key={index}   >
          <div className="work_left" onMouseEnter={() => handleMouseEnter(item.hoverImage)}
        onMouseLeave={handleMouseLeave}><span>{index+1}.</span>   {item.title}     <a href={item.link} target="_blank" rel="noopener noreferrer">
        <img src={url} alt={item.title} />
      </a></div>
          <div
            className="work_right"
          
          >
            {item.year} <br />
            <span>w /{item.company}</span>
          </div>
        </div>
      ))}
      {hoveredImage && (
        <img
          src={hoveredImage}
          className="work_image"
          style={hoveredImageStyle}
          alt="Work Image"
        />
      )}
    </div>
  );
};

export default Work;
