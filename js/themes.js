// Theme handling
function setTheme(themeName) {
  //console.debug(`Setting theme to: ${themeName}`);
  
  // Remove all theme classes
  document.body.classList.remove('theme-light', 'theme-sandstone', 'theme-forest', 'theme-dark');
  // console.debug('Removed existing theme classes');
  
  // Add the selected theme class
  const themeClass = `theme-${themeName}`;
  document.body.classList.add(themeClass);
  //console.debug(`Added new theme class: ${themeClass}`);
  
  // Update active button state
  document.querySelectorAll('.theme-button').forEach(button => {
    button.classList.remove('active');
    if (button.dataset.theme === themeName) {
      button.classList.add('active');
      //console.debug(`Set active state for button: ${themeName}`);
    }
  });

  // Save theme preference
  localStorage.setItem('preferred-theme', themeName);
  //console.debug('Saved theme preference to localStorage');
}

// Initialize theme selector
document.addEventListener('DOMContentLoaded', () => {
  //console.debug('DOM Content Loaded - Initializing theme selector');
  
  // Set default theme from localStorage or default to forest
  const savedTheme = localStorage.getItem('preferred-theme') || 'forest';
  //console.debug(`Retrieved saved theme: ${savedTheme}`);
  
  // Apply the forest theme class to body by default
  document.body.classList.add('theme-forest');
  
  setTheme(savedTheme);

  // Add click handlers to theme buttons
  const themeButtons = document.querySelectorAll('.theme-button');
  //console.debug(`Found ${themeButtons.length} theme buttons`);
  
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const themeName = button.dataset.theme;
      //console.debug(`Theme button clicked: ${themeName}`);
      setTheme(themeName);
    });
  });
});

// Add this to check if the script is loaded
//console.debug('themes.js loaded');
