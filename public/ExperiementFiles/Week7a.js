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

// arg1 is the lower bound in which you want the "random"
// content to be picked from.
// arg2 is the upper bound in which you want the "random"
// content to be picked from.
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
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    let RelMouseX = mouseX - CanvasCentreX;
    // The horizontal distance of the mouse from the centre of the canvas.

    let RelMouseY = mouseY - CanvasCentreY;
    // The vertical distance of the mouse from the centre of the canvas.

    // Flipping the "positive" y-axis of the Canvas API
    // so that the "positive" y-axis, is UP.
    // Ditto for the x-axis.

    let MaxDistance = Math.sqrt(CanvasCentreX ** 2 + CanvasCentreY ** 2);
    // Essentially pythagorean theorem. Where in a^2 + b^2 = c^2, a is the
    // vertical distance (y-value, CanvasCentreY) and b is the horizontal
    // distance (x-value, CanvasCentreX).

    let XDistance = RelMouseX / CanvasCentreX;
    let YDistance = RelMouseY / CanvasCentreY;

    let SoundX =
      XDistance >= 0
        ? XSoundsStart[Math.floor(Random(0, XSoundsStart.length))]
        : //Lanchu You are basically doing the following:
          // Since XSoundsStart[i], this the identity of an index in the
          // array
          // You are basically saying within the identity of the "index", within the []
          // Pick a random "index" number from 0 to the max length of the array.
          // Then round that shit down, so that the index is a whole number and doesn't have
          // floats.

          XSoundsEnd[Math.floor(Random(0, XSoundsEnd.length))];

    let SoundY =
      XDistance >= 0
        ? YSoundsStart[Math.floor(Random(0, YSoundsStart.length))]
        : YSoundsEnd[Math.floor(Random(0, YSoundsEnd.length))];

    let blendX = Math.abs(XDistance);
    let blendY = Math.abs(distanceY);

    SoundX.volume = blendX;
    SoundY.volume = blendY;

    SoundX.play();
    SoundY.play();
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
