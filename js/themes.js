// Theme handling
const themes = ['sandstone', 'charcoal-coffee'];

function setTheme(themeName) {
  console.debug(`Setting theme to: ${themeName}`);
  
  // Remove all theme classes
  document.body.classList.remove(
    //'theme-light', 
    'theme-sandstone', 
    //'theme-forest', 
    'theme-charcoal-coffee', 
    //'theme-dark'
  );
  console.debug('Removed existing theme classes');
  
  // Add the selected theme class
  const themeClass = `theme-${themeName}`;
  document.body.classList.add(themeClass);
  console.debug(`Added new theme class: ${themeClass}`);
  
  // Update the single theme button
  const themeButton = document.getElementById('single-theme-button');
  if (themeButton) {
    // Remove all theme data attributes
    themes.forEach(theme => {
      themeButton.removeAttribute(`data-theme-${theme}`);
    });
    
    // Set the current theme data attribute
    themeButton.setAttribute('data-theme', themeName);
    console.debug(`Updated theme button to: ${themeName}`);
  }

  // Update the Hazelbot SVG based on theme
  const hazelLogo = document.getElementById('hazel-logo');
  if (hazelLogo) {
    if (themeName === 'sandstone') {
      hazelLogo.src = 'images/hazelbot_dark.svg';
    } else if (themeName === 'charcoal-coffee') {
      hazelLogo.src = 'images/hazelbot_light.svg';
    }
  }

  // Save theme preference
  localStorage.setItem('preferred-theme', themeName);
  console.debug('Saved theme preference to localStorage');
}

function cycleToNextTheme() {
  const currentTheme = localStorage.getItem('preferred-theme') || 'charcoal-coffee';
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];
  
  console.debug(`Cycling from ${currentTheme} to ${nextTheme}`);
  setTheme(nextTheme);
}

// Initialize theme selector
document.addEventListener('DOMContentLoaded', () => {
  //console.debug('DOM Content Loaded - Initializing theme selector');
  
  // Set default theme from localStorage or default to charcoal-coffee
  const savedTheme = localStorage.getItem('preferred-theme') || 'charcoal-coffee';
  //console.debug(`Retrieved saved theme: ${savedTheme}`);
  
  // Apply the charcoal-coffee theme class to body by default
  document.body.classList.add('theme-charcoal-coffee');
  
  setTheme(savedTheme);

  // Add click handler to the single theme button
  const themeButton = document.getElementById('single-theme-button');
  if (themeButton) {
    //console.debug('Found single theme button');
    themeButton.addEventListener('click', () => {
      //console.debug('Theme button clicked - cycling to next theme');
      cycleToNextTheme();
    });
  }
});

// Add this to check if the script is loaded
//console.debug('themes.js loaded');
