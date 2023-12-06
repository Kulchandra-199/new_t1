import React from "react";
import { useEffect, useState } from "react";
import "./header.css";
import git from "../../assets/images/github.png"
import twitter from "../../assets/images/twitter.png"
import linke from "../../assets/images/linkedin.png"


const Header = () => {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up timer on unmount
    return () => clearInterval(timer);
  }, []);
const [joke, setjoke] = useState("")
  useEffect(() => {
    const fetchJokes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?amount=5");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data)
        setJokes(data.jokes || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jokes:", error);
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchJokes();
  }, []);

 
  
  return (
    <div className="sticky">
      <div className="header_wrapper">
        <div className="hw_left">
          <div className="hw_left_wrapper">
            <div className="logo">KK</div>
            <button className="h_button">work</button>
            <button className="h_button">info</button>
            <button className="h_button">code</button>
          </div>
        </div>
        <div className="hw_center">
        <div className="socials">
      <div className="icons">
        <a href="https://github.com/Kulchandra-199" target="_blank" rel="noopener noreferrer">
          <img src={git} alt="GitHub" />
        </a>
      </div>
      <div className="icons">
        <a href="https://twitter.com/high_on_js" target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="Twitter" />
        </a>
      </div>
      <div className="icons">
        <a href="https://www.linkedin.com/in/kulchandra-kandel-804275194/" target="_blank" rel="noopener noreferrer">
          <img src={linke} alt="LinkedIn" />
        </a>
      </div>
    </div>
        </div>
        <div className="hw_right">
          Delhi, IN <br />
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Header;