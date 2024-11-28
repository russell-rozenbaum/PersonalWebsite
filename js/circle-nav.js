import React from 'react';
import { useState } from 'react';

const CircularNav = () => {
  const [isHovered, setIsHovered] = useState(null);
  
  // Calculate positions for 5 buttons around a circle
  const getButtonPositions = (radius, centerOffset = 0) => {
    const buttons = [
      { label: 'research', href: '#research' },
      { label: 'projects', href: '#projects' },
      { label: 'music', href: '#music' },
      { label: 'writing', href: '#writing' },
      { label: 'sounds', href: '#sounds' }
    ];
    
    return buttons.map((btn, index) => {
      // Calculate angle for each button (starting from top, going clockwise)
      // Subtract π/2 to start from top instead of right
      const angle = (index * 2 * Math.PI) / buttons.length - Math.PI / 2;
      
      // Calculate x and y positions
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      return {
        ...btn,
        style: {
          transform: `translate(${x}px, ${y}px)`,
          position: 'absolute',
          left: '50%',
          top: '50%',
        }
      };
    });
  };

  return (
    <div className="relative w-[800px] h-[800px]">
      {/* Profile Image Container */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-[400px] h-[400px] rounded-full border-[2.5px] border-[rgb(248,243,231)] overflow-hidden"
          style={{
            backgroundImage: "url('images/IMG_9730.JPG')",
            backgroundSize: 'cover'
          }}
        />
      </div>
      
      {/* Navigation Buttons */}
      {getButtonPositions(300).map((btn, index) => (
        <a
          key={btn.label}
          href={btn.href}
          className="absolute transition-all duration-300 text-[rgb(248,243,231)] hover:text-[rgb(107,117,102)] text-xl font-cursive"
          style={btn.style}
          onMouseEnter={() => setIsHovered(index)}
          onMouseLeave={() => setIsHovered(null)}
        >
          {btn.label}
        </a>
      ))}
    </div>
  );
};

export default CircularNav;