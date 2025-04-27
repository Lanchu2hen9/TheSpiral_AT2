// I didn't write the following code.
document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

// Array to store buttons and their properties (text, coordinates, target path)
const buttons = [
  {
    text: "Week 4a Task",
    x: 100,
    y: 100,
    width: 300,
    height: 40,
    path: "/ExperiementFiles/index2.html", // Path for button 1
  },
  {
    text: "Week 4b Task",
    x: 100,
    y: 200,
    width: 300,
    height: 40,
    path: "/ExperiementFiles/index3.html", // Path for button 2
  },
  {
    text: "AT2 Task",
    x: 100,
    y: 300,
    width: 300,
    height: 40,
    path: "/ExperiementFiles/AT2-V1.0.html", // Path for button 3
  },
  {
    text: "Week 7a task",
    x: 100,
    y: 400,
    width: 300,
    height: 40,
    path: "/ExperiementFiles/Week7a.html", // Path for button 3
  },
];

// Function to draw the frame and buttons
const draw_frame = (ms) => {
  // Set background color
  ctx.fillStyle = `turquoise`;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  // Display the time in seconds in the console (for debugging)
  const seconds = ms / 1000;
  console.log(seconds.toFixed(2));

  // Draw each button
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";

  buttons.forEach((button) => {
    ctx.fillText(button.text, button.x, button.y);
  });

  requestAnimationFrame(draw_frame);
};

// Draw initial frame
draw_frame();

// Resize handler
onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};

// Event listener for click events on the canvas
cnv.addEventListener("click", (event) => {
  // Get the mouse coordinates
  const x = event.clientX;
  const y = event.clientY;

  // Check if the click is within any button's bounds
  buttons.forEach((button) => {
    if (
      x >= button.x &&
      x <= button.x + button.width &&
      y >= button.y - button.height &&
      y <= button.y
    ) {
      // Redirect to the corresponding path
      window.location.href = button.path;
    }
  });
});
