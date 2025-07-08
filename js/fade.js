window.addEventListener("scroll", function() {

    const navbarCats = document.querySelector(".navbar-cats");
    const themeSelector = document.querySelector(".theme-selector");
    const maxScroll = 250;
    const scrollTop = window.scrollY;
    
    // Calculate the new opacity (it decreases as the user scrolls down)
    let newOpacity = 1.8 - (scrollTop / maxScroll);
    
    // Make sure opacity stays within valid range (0 to 1)
    newOpacity = Math.max(0, Math.min(1, newOpacity));
    
    // Apply the new opacity to the navbar
    navbarCats.style.opacity = newOpacity;
    themeSelector.style.opacity = newOpacity;
  });