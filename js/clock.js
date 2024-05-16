function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const secondsString = seconds < 10 ? "0" + seconds : seconds;
    const minutesString = minutes < 10 ? "0" + minutes : minutes;
    let hoursString = hours > 12 ? hours % 12 : hours;
    if (hoursString == 0) {
        hoursString = 12;
    }
    const timeString = `${hoursString}:${minutesString}:${secondsString} ${amOrPm}`;
    timeElement.textContent = timeString;
  }

  function updateDate() {
    const dateElement = document.getElementById('date');
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    let monthString = month < 10 ? "0" + month : month;
    const year = now.getFullYear();
    const dateString = `${monthString}/${day}/${year}`;
    dateElement.textContent = dateString;
  }
  
  // Call the updateTime function initially
  updateTime();

  // Call the updateDate function initially
  updateDate();
  
  // Update the time every second
  setInterval(updateTime, 1000);
  setInterval(updateDate, 1000);


