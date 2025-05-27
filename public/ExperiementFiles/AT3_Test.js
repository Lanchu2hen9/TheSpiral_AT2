document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

const draw_frame = (ms) => {
  ctx.fillStyle = `turquoise`;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  const seconds = ms / 1000;
  // console.log (seconds.toFixed (2))

  requestAnimationFrame(draw_frame);
};

draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};

// --- Mute Button "Run Away" Logic Starts Here ---

const muteButton = document.getElementById("MuteButton");

// 1. Give the button a style so we can move it
muteButton.style.position = "absolute"; // This is crucial for controlling its position
muteButton.style.left = "50%"; // Start roughly in the center horizontal
muteButton.style.top = "50%"; // Start roughly in the center vertical
// This helps center it perfectly, adjusting for the button's own size
muteButton.style.transform = "translate(-50%, -50%)";
// Add a smooth transition so it slides, rather than jumping
muteButton.style.transition = "all 0.3s ease-out";
muteButton.style.padding = "15px 30px"; // Make it a bit bigger/easier to interact with
muteButton.style.fontSize = "1.2em";
muteButton.style.cursor = "pointer"; // Make it clear it's clickable

// Variable to track mute state (we'll connect this to WebRTC later)
let isMuted = false;

// 2. Handle the "Catch Me!" click event
muteButton.addEventListener("click", () => {
  isMuted = !isMuted; // Toggle the mute state
  if (isMuted) {
    console.log("MIC MUTED! (You caught the elusive button! ヾ(≧▽≦*)o)");
    muteButton.textContent = "Unmute Me! :O";
    // *** Future WebRTC step: Call a function like `toggleWebRtcMute(true)` here ***
  } else {
    console.log("MIC UNMUTED! (Let's make some noise! (b ᵔ▽ᵔ)b)");
    muteButton.textContent = "CatchMe! :P";
    // *** Future WebRTC step: Call a function like `toggleWebRtcMute(false)` here ***
  }
  // You could also reset its position to the center after being caught,
  // or temporarily disable its movement. For now, it just keeps running.
});

// 3. Make the button run away when the mouse gets close
document.addEventListener("mousemove", (e) => {
  // Get the button's exact position and size on the screen
  const buttonRect = muteButton.getBoundingClientRect();
  const buttonCenterX = buttonRect.left + buttonRect.width / 2;
  const buttonCenterY = buttonRect.top + buttonRect.height / 2;

  // Get the current mouse position
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Define how close the mouse can get before the button runs
  const safeDistance = 120; // Pixels

  // Calculate the distance between the mouse and the button's center
  const distance = Math.sqrt(
    Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
  );

  // If the mouse is too close, calculate a new random position
  if (distance < safeDistance) {
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50; // Prevent infinite loop if it gets stuck in a corner

    // Loop to find a new position that is *far enough* from the mouse
    do {
      // Generate random coordinates within the window boundaries
      newX = Math.random() * (innerWidth - buttonRect.width);
      newY = Math.random() * (innerHeight - buttonRect.height);

      // Calculate the distance from the mouse to this *new potential position*
      const newDistance = Math.sqrt(
        Math.pow(mouseX - (newX + buttonRect.width / 2), 2) +
          Math.pow(mouseY - (newY + buttonRect.height / 2), 2)
      );
      attempts++;
      // If the new position is far enough, or we've tried too many times, break
      if (newDistance > safeDistance * 2 || attempts > maxAttempts) {
        // Make it jump further away
        break;
      }
    } while (true); // Keep trying until a good spot is found or attempts run out

    // Apply the new position to the button's style
    muteButton.style.left = `${newX}px`;
    muteButton.style.top = `${newY}px`;
  }
});

// --- Optional: Basic Touchscreen Support (for the "escape" logic) ---
// Getting smooth, precise touch interactions can be a bit more complex,
// but this gives you a starting point for the button to react to fingers.
document.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]; // Get the first touch point
      const buttonRect = muteButton.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const touchX = touch.clientX;
      const touchY = touch.clientY;

      const safeDistanceTouch = 150; // A bit larger for finger
      const distance = Math.sqrt(
        Math.pow(touchX - buttonCenterX, 2) +
          Math.pow(touchY - buttonCenterY, 2)
      );

      if (distance < safeDistanceTouch) {
        let newX, newY;
        let attempts = 0;
        const maxAttempts = 50;

        do {
          newX = Math.random() * (innerWidth - buttonRect.width);
          newY = Math.random() * (innerHeight - buttonRect.height);

          const newDistance = Math.sqrt(
            Math.pow(touchX - (newX + buttonRect.width / 2), 2) +
              Math.pow(touchY - (newY + buttonRect.height / 2), 2)
          );
          attempts++;
          if (newDistance > safeDistanceTouch * 2 || attempts > maxAttempts) {
            break;
          }
        } while (true);

        muteButton.style.left = `${newX}px`;
        muteButton.style.top = `${newY}px`;
      }
    }
  },
  { passive: false }
); // Use { passive: false } to allow preventing default if needed,
// though not strictly necessary for this particular effect.
