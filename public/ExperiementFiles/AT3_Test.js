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
    muteButton.textContent = ":O";
    // *** Future WebRTC step: Call a function like `toggleWebRtcMute(true)` here ***
  } else {
    console.log("MIC UNMUTED! (Let's make some noise! (b ᵔ▽ᵔ)b)");
    muteButton.textContent = ":P";
    // *** Future WebRTC step: Call a function like `toggleWebRtcMute(false)` here ***
  }
  // You could also reset its position to the center after being caught,
  // or temporarily disable its movement. For now, it just keeps running.
});

document.addEventListener("mousemove", (e) => {
  const buttonRect = muteButton.getBoundingClientRect();

  const buttonCenterX = buttonRect.left + buttonRect.width / 2;

  const buttonCenterY = buttonRect.top + buttonRect.height / 2;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const MouseSneak = 90;
  const EdgePadding = 35;

  const distance = Math.sqrt(
    Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
  );

  if (distance < MouseSneak) {
    let newX;
    let newY;

    for (let i = 0; i < 50; i++) {
      newX =
        EdgePadding +
        Math.random() * (innerWidth - 2 * EdgePadding - buttonRect.width);
      newY =
        EdgePadding +
        Math.random() * (innerHeight - 2 * EdgePadding - buttonRect.height);

      const newDistance = Math.sqrt(
        Math.pow(mouseX - (newX + buttonRect.width / 2), 2) +
          Math.pow(mouseY - (newY + buttonRect.height / 2), 2)
      );
      if (newDistance > MouseSneak * 9) {
        //Controls how fast the button runs away from the mouse.
        break;
      }
      muteButton.style.left = `${newX}px`;
      muteButton.style.top = `${newY}px`;
    }
  }
});

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
