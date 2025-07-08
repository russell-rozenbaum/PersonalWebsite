// Get the element where we want to display the typing animation
// Assuming you'll add this element to your navbar-name's a tag
const typingElement = document.querySelector('.name');
const cursorElement = document.querySelector('.name-cursor');
const fullName = "russell rozenbaum";
let nickName = false;
let currentText = "";
let letterIndex = 0;
let isTyping = true;
let cursorVisible = true;
let blinks = 0;

let backspaceSpeed = 150;

// Function to update the text with cursor
function updateText() {
    typingElement.textContent = currentText + (cursorVisible ? "|" : " \u00A0");
    if (blinks >= 4) {
        typingElement.textContent = currentText;
    }
}

// Function to handle the cursor blinking
function blinkCursor() {
    if (blinks < 2) {
        cursorVisible = !cursorVisible;
        updateText();
        blinks++;
        setTimeout(blinkCursor, 500);
    }
    else if (currentText.length <= 4 && blinks < 7) {
        cursorVisible = !cursorVisible;
        updateText();
        blinks++;
        setTimeout(blinkCursor, 500);
    }
    else if (blinks >= 4) {
        updateText();
    }
    else {
        setTimeout(backspaceName, 150);
    }
}

// Function to type out the name
function typeName() {
    if (letterIndex < fullName.length) {
        currentText = fullName.substring(0, letterIndex + 1);
        letterIndex++;
        updateText();
        setTimeout(typeName, 150);
    } else {
        blinkCursor();
    }
}

function backspaceName() {
    if (letterIndex > 4) {
        currentText = fullName.substring(0, letterIndex - 1);
        letterIndex--;
        updateText();
        setTimeout(backspaceName, backspaceSpeed);
        backspaceSpeed -= 5;
    }
    else {
        nickName = true;
        blinkCursor();
    }
}

// Start the typing animation when the page loads
window.addEventListener('load', () => {
    // Clear any existing text first
    currentText = "";
    // Start typing after a short delay
    setTimeout(typeName, 500);
});