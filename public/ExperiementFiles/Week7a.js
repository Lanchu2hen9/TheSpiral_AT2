document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

//#region Global Variables:
let YSoundsStart = [];
let YSoundsEnd = [];
let XSoundsStart = [];
let XSoundsEnd = [];
//#endregion

//#region  Canvas Centre
let CanvasCentreX = innerWidth / 2;
let CanvasCentreY = innerHeight / 2;
//#endregion

//#region Randomiser
function Random(arg1, arg2) {
  // Defines two arguments array parameters
  //  within the function random.

  if (arguments.length == 1) {
    // If the the length of the arguments array
    // is equals roughly to 1.

    const max = arg1;
    // Then define max as arg1.

    return Math.random() * max;
    // Stops the function from executing
    // and gives a random number
    // between 0 and max.
  } else if (arguments.length == 2) {
    // If the length of the arguments arrays
    // is roughly equal to 2.

    const min = arg1;
    // Define min as arg1.

    const max = arg2;
    // Define max as arg2.

    const range = max - min;
    // Define range as max - min.

    return Math.random() * range + min;
    // Stops the function from executing,
    // and outputs a random number.
  }
}
//#endregion

// #region Setup Function
function setup() {
  OnUserClick();
}
//#endregion

// #region MouseMove Function
function MouseTracker() {
  cnv.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    let RelMouseX = mouseX - CanvasCentreX;
    let RelMouseY = mouseY - CanvasCentreY;
    // Flipping the "positive" y-axis of the Canvas API
    // so that the "positive" y-axis, is UP.
    // Ditto for the x-axis.
  });
}
//#endregion

// #region Click Function
function OnUserClick() {
  cnv.addEventListener("mousedown", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log("The mouse was clicked on the canvas");
    console.log("the mouse was clicked at", e.clientX, e.clientY);

    // I was advised by ChatGPT to use to use mouseMove to track the mouse position
    // in real time, as mousedown only tracks the position/snapshot of the mouse at
    // point of click.
  });
}
//#endregion

// #region Draw Function
const draw_frame = (ms) => {
  ctx.fillStyle = `turquoise`;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  const seconds = ms / 1000;
  console.log(seconds.toFixed(2));

  requestAnimationFrame(draw_frame);
};
// #endregion

draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};
