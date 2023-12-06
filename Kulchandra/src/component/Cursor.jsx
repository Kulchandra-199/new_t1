import React, { useEffect, useRef, useState } from 'react';
import TweenMax from 'gsap';

const Cursor = ({ children, ...props }) => {
  const cursorRef = useRef(null);
  const amount = 20; // Number of dots
  const sineDots = Math.floor(amount * 0.3); // Number of dots in sine wave
  const width = 26; // Dot size
  const idleTimeout = 150; // Idle timeout in milliseconds
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState([]);
  const [idle, setIdle] = useState(false);
  let timeoutID;

  useEffect(() => {
    const init = () => {
      // Build dots
      const dotsArray = [];
      for (let i = 0; i < amount; i++) {
        dotsArray.push(new Dot(i, width, idleTimeout));
      }
      setDots(dotsArray);

      // Event listeners
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);

      // Start render loop
      requestAnimationFrame(render);
    };

    init();

    return () => {
      // Cleanup on unmount
      clearTimeout(timeoutID);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const onMouseMove = (event) => {
    setMousePosition({
      x: event.clientX - width / 2,
      y: event.clientY - width / 2,
    });
    resetIdleTimer();
  };

  const onTouchMove = () => {
    setMousePosition({
      x: event.touches[0].clientX - width / 2,
      y: event.touches[0].clientY - width / 2,
    });
    resetIdleTimer();
  };

  const startIdleTimer = () => {
    timeoutID = setTimeout(() => setIdle(true), idleTimeout);
  };

  const resetIdleTimer = () => {
    clearTimeout(timeoutID);
    setIdle(false);
    startIdleTimer();
  };

  const render = (timestamp) => {
    const delta = timestamp - Date.now(); // Time delta since last frame

    // Update dots
    dots.forEach((dot, index) => {
      dot.update(mousePosition, delta, idle, sineDots);
    });

    // Render cursor element
    if (cursorRef.current) {
      TweenMax.set(cursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
      });
    }

    requestAnimationFrame(render);
  };

  return (
    <div ref={cursorRef} className="animated-cursor" {...props}>
      {children}
    </div>
  );
};

// Dot class definition (omitted for brevity)

export default Cursor;