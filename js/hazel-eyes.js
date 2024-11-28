document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.section-image');
  const leftEye = document.querySelector('.left-eye');
  const rightEye = document.querySelector('.right-eye');
  
  // Maximum movement range in pixels
  const MAX_MOVEMENT = 3;

  // Base positions (current CSS positions)
  const leftEyeBase = { x: 30, y: 57 }; // percentage values from your CSS
  const rightEyeBase = { x: 62, y: 57 }; // percentage values from your CSS
  
  document.addEventListener('mousemove', function(e) {
    if (!container || !leftEye || !rightEye) return;
    
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle and distance for eye movement
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
    const distance = Math.min(MAX_MOVEMENT, 
      Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)) / 30);
    
    // Calculate eye movements
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    // Apply transformations while maintaining base position
    leftEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    rightEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});