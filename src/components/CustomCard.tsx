"use client";

// CustomCard.tsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

interface CustomCardProps {
  title: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title }) => {
  // State to track if the screen is in mobile view
  const [isMobile, setIsMobile] = useState(false);

  // Effect to handle window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define breakpoint for mobile (e.g., 768px)
    };

    // Check if window is defined (i.e., code is running in the browser)
    if (typeof window !== 'undefined') {
      handleResize(); // Set initial state
      window.addEventListener('resize', handleResize);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Dynamic grid style based on screen size
  const gridStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '50%', // Full width for mobile, 2 columns for desktop
    textAlign: 'start', 
    padding: 10,
    // backgroundColor: '#f0f0f0',
    // border: '1px solid #e8e8e8',
    borderTop: '1px solid #e8e8e8', // Top border
  borderBottom: '1px solid #e8e8e8', 
    // margin: '5px 0',
  };

  return (
    <Card title={title}>
      {/* First Row */}
      <Card.Grid hoverable={false} style={gridStyle}>Item 1</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>Item 2</Card.Grid>

      {/* Second Row */}
      <Card.Grid hoverable={false} style={gridStyle}>Item 3</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>Item 4</Card.Grid>

      {/* Third Row */}
      <Card.Grid hoverable={false} style={gridStyle}>Item 5</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>Item 6</Card.Grid>
    </Card>
  );
};

export default CustomCard;