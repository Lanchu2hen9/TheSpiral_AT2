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
// Gets the button element by its ID tag from the HTML.

muteButton.style.position = "absolute";
// Positions the button absolutely in relation to the window iteslf.

//Starting point position for the button.
muteButton.style.left = "50%";
muteButton.style.top = "50%";

muteButton.style.transform = "translate(-50%, -50%)";

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
  const buttonRect = muteButton.getBoundingClientRect();
  // Gets the button's 2D hitbox.
  // BoundingClientRect contains the values of the btn's
  // top, left, width, and height. It also includes the
  // padding, border/outline of the button.

  const buttonCenterX = buttonRect.left + buttonRect.width / 2;
  // The horizontal centre of the button is the left side of the button
  // plus the width of the button divided by 2.

  const buttonCenterY = buttonRect.top + buttonRect.height / 2;
  // The vertical centre of the button is the top side of the button
  // plus the height of the button divided by 2.

  // Get the current mouse position
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Define how close the mouse can get before the button runs
  const MouseSneak = 90; // Pixels

  const distance = Math.sqrt(
    Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
  );
  //Using the Pythagorean theorem to calculate the distance b/w the mouse
  // and the centre of the button.

  // So the coordinates of the mouse is (mouseX, mouseY)
  // and the coordinates of the button's center is (buttonCenterX, buttonCenterY).

  // So (mouseX - buttonCentreX)² + (mouseY - buttonCentreY)² = const distance²
  // Where distance = (the distance between the mouse and the button's center)²

  // So to get the direct distance between the mouse and the button's center, we do:
  // const distance = √(mouseX - buttonCenterX)² + (mouseY - buttonCenterY)²

  // If the mouse is too close, calculate a new random position
  if (distance < MouseSneak) {
    let newX, newY;
    // newX and newY is the new X and Y coordinates for the buttons to jump to.

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
      if (newDistance > MouseSneak * 2 || attempts > maxAttempts) {
        // Make it jump further away
        break;
      }
    } while (true); // Keep trying until a good spot is found or attempts run out

    // Apply the new position to the button's style
    muteButton.style.left = `${newX}px`;
    muteButton.style.top = `${newY}px`;
  }
});

// document.addEventListener("mousemove", (e) => {

//     const buttonRect = muteButton.getBoundingClientRect();
//   // Gets the button's 2D hitbox.
//   // BoundingClientRect contains the values of the btn's
//   // top, left, width, and height. It also includes the
//   // padding, border/outline of the button.

//   const buttonCenterX = buttonRect.left + buttonRect.width / 2;
//   // The horizontal centre of the button is the left side of the button
//   // plus the width of the button divided by 2.

//   const buttonCenterY = buttonRect.top + buttonRect.height / 2;
//   // The vertical centre of the button is the top side of the button
//   // plus the height of the button divided by 2.

//   // Get the current mouse position
//   const mouseX = e.clientX;
//   const mouseY = e.clientY;

//   // Define how close the mouse can get before the button runs
//   const MouseSneak = 90; // Pixels

//   const distance = Math.sqrt(
//     Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
//   );

//   if (distance < MouseSneak) {
//   }

// });

// // --- Optional: Basic Touchscreen Support (for the "escape" logic) ---
// // Getting smooth, precise touch interactions can be a bit more complex,
// // but this gives you a starting point for the button to react to fingers.
// document.addEventListener(
//   "touchmove",
//   (e) => {
//     if (e.touches.length > 0) {
//       const touch = e.touches[0]; // Get the first touch point
//       const buttonRect = muteButton.getBoundingClientRect();
//       const buttonCenterX = buttonRect.left + buttonRect.width / 2;
//       const buttonCenterY = buttonRect.top + buttonRect.height / 2;

//       const touchX = touch.clientX;
//       const touchY = touch.clientY;

//       const FingerSneakTouch = 110; // A bit larger for finger
//       const distance = Math.sqrt(
//         Math.pow(touchX - buttonCenterX, 2) +
//           Math.pow(touchY - buttonCenterY, 2)
//       );

//       if (distance < FingerSneakTouch) {
//         let newX, newY;
//         let attempts = 0;
//         const maxAttempts = 50;

//         do {
//           newX = Math.random() * (innerWidth - buttonRect.width);
//           newY = Math.random() * (innerHeight - buttonRect.height);

//           const newDistance = Math.sqrt(
//             Math.pow(touchX - (newX + buttonRect.width / 2), 2) +
//               Math.pow(touchY - (newY + buttonRect.height / 2), 2)
//           );
//           attempts++;
//           if (newDistance > FingerSneakTouch * 2 || attempts > maxAttempts) {
//             break;
//           }
//         } while (true);

//         muteButton.style.left = `${newX}px`;
//         muteButton.style.top = `${newY}px`;
//       }
//     }
//   },
//   { passive: false }
// ); // Use { passive: false } to allow preventing default if needed,
// // though not strictly necessary for this particular effect.
