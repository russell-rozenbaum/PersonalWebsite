
let size = 3;

let inc = 0; 

function profileImage() {
    const imageElement = document.getElementById('profile-image');
    inc = inc + (Math.PI / 10000);
    imageElement.style.border = 6 + (Math.sin(inc) * 3) + 'px solid rgb(255, 248, 235)';
  }

  
  // Update the time every second
  setInterval(profileImage, 5);