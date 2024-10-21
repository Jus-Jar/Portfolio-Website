// Set duration for each slide (in milliseconds)
const slideDuration = 5000; // 5 seconds

// Grab the sliding text element
const slidingText = document.getElementById('sliding-text');

// Array of texts to display
const texts = [
  "A Software Engineer",
  "A CS Graduate",
  "A Software Developer"
];

// Index to track which text to display
let currentIndex = 0;

function slideText() {
  // Slide the current text out
  slidingText.classList.remove('slide-in');
  slidingText.classList.add('slide-out');
  
  // After the slide-out animation is done, switch to the next text
  setTimeout(() => {
    // Update the text
    currentIndex = (currentIndex + 1) % texts.length; // Cycle through the array
    slidingText.textContent = texts[currentIndex];

    // Slide the new text in
    slidingText.classList.remove('slide-out');
    slidingText.classList.add('slide-in');
  }, 2000); // This matches the duration of the `slideOut` animation (2 seconds)
}

// Start the text sliding cycle
setInterval(slideText, slideDuration);
