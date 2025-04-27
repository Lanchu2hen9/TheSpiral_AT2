document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

//#region Global Variables:
let YSoundsStart = [];
// YSoundsStart is an array that will hold the sound objects
// attached to the +y-axis of the canvas.

let YSoundsEnd = [];
// YSoundsEnd is an array that will hold the sound objects
// attached to the -y-axis of the canvas.

let XSoundsStart = [];
// XSoundsStart is an array that will hold the sound objects
// attached to the +x-axis of the canvas.

let XSoundsEnd = [];
// XSoundsStart is an array that will hold the sound objects
// attached to the -x-axis of the canvas.
//#endregion

//#region  Canvas Centre
let CanvasCentreX = innerWidth / 2;
// Calculates the "x-coordinate" centre
// of the canvas.

let CanvasCentreY = innerHeight / 2;
// Calculates the "y-coordinate" centre
// of the canvas.
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
  // Calls the OnUserClick function.

  MouseTracker();
  // Calls the MouseTracker function.
}
//#endregion

// #region MouseMove Function
function MouseTracker() {
  cnv.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    // mouseX variable that holds the x-coordinate of the mouse,
    // relative to the top left corner of the canvas.

    const mouseY = e.clientY;
    // mouseY variable that holds the y-coordinate of the mouse,
    // relative to the top left corner of the canvas.

    let RelMouseX = mouseX - CanvasCentreX;
    // The horizontal distance of the mouse from the relative
    // to the centre of the canvas.

    let RelMouseY = mouseY - CanvasCentreY;
    // The vertical distance of the mouse from the relative
    // to the centre of the canvas.

    // Flipping the "positive" y-axis of the Canvas API
    // so that the "positive" y-axis, is UP.
    // Ditto for the x-axis.

    let MaxDistance = Math.sqrt(CanvasCentreX ** 2 + CanvasCentreY ** 2);
    // Essentially pythagorean theorem. Where in a^2 + b^2 = c^2, a is the
    // vertical distance (y-value, CanvasCentreY) and b is the horizontal
    // distance (x-value, CanvasCentreX).

    let XDistance = RelMouseX / CanvasCentreX;
    // Calculates the "percentage"/"fraction" of the x-distance from the
    // centre of the canvas. (0,0)
    let YDistance = RelMouseY / CanvasCentreY;
    // Calculates the "percentage"/"fraction" of the y-distance from the
    // centre of the canvas. (0,0)

    // This makes it so that the distance from the mouse from the centre
    // of the canvas is independent of whatever value the width and height
    // of the canvas is.

    let SoundX =
      XDistance >= 0
        ? XSoundsStart[Math.floor(Random(0, XSoundsStart.length))]
        : XSoundsEnd[Math.floor(Random(0, XSoundsEnd.length))];
    // 1. Create a variable called SoundX.
    // 2. if the mouse is larger than or equal to 0, then choose a random sound from the XSoundsStart array.
    // 3. If not, then choose a random sound from the XSoundsEnd array.

    //Lanchu for "XSoundsEnd[Math.floor(Random(0, XSoundsEnd.length))];"
    // Since XSoundsEnd[i], this the identity of an index in the
    // array
    // You are basically saying within the identity of the "index", within the []
    // Pick a random "index" number from 0 to the max length of the array.
    // Then round that shit down, so that the index is a whole number and doesn't have
    // floats.

    let SoundY =
      YDistance >= 0
        ? YSoundsStart[Math.floor(Random(0, YSoundsStart.length))]
        : YSoundsEnd[Math.floor(Random(0, YSoundsEnd.length))];
    // 1. Create a variable called SoundX.
    // 2. if the mouse is larger than or equal to 0, then choose a random sound
    // from the XSoundsStart array.
    // 3. If not, then choose a random sound from the XSoundsEnd array.

    let blendX = Math.abs(XDistance);
    // Creates variable called blendX, and assigning it the absolute value of
    // of XDistance.

    let blendY = Math.abs(YDistance);
    // Creates variable called blendY, and assigning it the absolute value of
    // of Distance.

    SoundX.volume = blendX;
    // The volume of the audio clip is the value of blendX.

    SoundY.volume = blendY;
    // The volume of the audio clip is the value of blendY.

    SoundX.play();
    // Play the sound object in the SoundX variable.

    SoundY.play();
    // Play the sound object in the SoundX variable.
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
