document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

//#region Audio Clip References
// Missions Sounds & Sound Bites ~ Launch, Morse Code, Passing Comet by DudeAwesome. (2017). Freesound. https://freesound.org/people/DudeAwesome/sounds/386068/
// Short Wave Radio Noise 1 by zmobie. (2025). Freesound. https://freesound.org/people/zmobie/sounds/257880/
// Shuttle to Station Sounds & Sound Bites by DudeAwesome. (2017). Freesound. https://freesound.org/people/DudeAwesome/sounds/386067/
// atlas3q-1FM-16bit.wav by pixelmasseuse. (2025). Freesound. https://freesound.org/people/pixelmasseuse/sounds/95822/
// Birds In The Forest by BurghRecords. (2019). Freesound. https://freesound.org/people/BurghRecords/sounds/456123/
// wolf howle.wav by malg0isx. (2021). Freesound. https://freesound.org/people/malg0isx/sounds/567994/
// AMBForst_Autumn.A Quiet Forest.Wind In The Pines And Birches.Pine Creaking 1_EM by newlocknew. (2024). Freesound. https://freesound.org/people/newlocknew/sounds/756754/
// waves ocean crash on beach nearby wide big metallic sound.flac by kyles. (2018). Freesound. https://freesound.org/people/kyles/sounds/450634/

//#endregion
//#region Global Variables:
let YSoundsStart = [];
let YSoundsEnd = [];
let XSoundsStart = [];
let XSoundsEnd = [];
//#endregion

//#region  Canvas Centre
let CanvasCentreX = innerWidth / 2;
// Calculates the "x-coordinate" centre
// of the canvas.

let CanvasCentreY = innerHeight / 2;
// Calculates the "y-coordinate" centre
// of the canvas.
//#endregion

//#region Preload Audio
function preload() {
  YSoundsStart = [
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/386067__dudeawesome__shuttle-to-station-sounds-sound-bites.flac"
    ),
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/386068__dudeawesome__missions-sounds-sound-bites-launch-morse-code-passing-comet.flac"
    ),
  ];
  // YSoundsStart is an array that will hold the sound objects
  // attached to the +y-axis of the canvas.

  YSoundsEnd = [
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/95822__pixelmasseuse__atlas3q-1fm-16bit.wav"
    ),
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/59899__robinhood76__00309-crowd-2.wav"
    ),
  ];
  // YSoundsEnd is an array that will hold the sound objects
  // attached to the -y-axis of the canvas.
  XSoundsStart = [
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/567994__malg0isx__wolf-howle.wav"
    ),
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/456123__burghrecords__birds-in-the-forest.wav"
    ),
  ];

  // XSoundsStart is an array that will hold the sound objects
  // attached to the +x-axis of the canvas.

  XSoundsEnd = [
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/756754__newlocknew__ambforst_autumna-quiet-forestwind-in-the-pines-and-birches.wav"
    ),
    new Audio(
      "/ExperiementFiles/audio/ExpAudio/450634__kyles__waves-ocean-crash-on-beach-nearby-wide-big-metallic-sound.flac"
    ),
  ];
  // XSoundsStart is an array that will hold the sound objects
  // attached to the -x-axis of the canvas.
}
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
  preload();
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

    SoundX.pause();
    SoundX.currentTime = 0;
    SoundX.play();

    SoundY.pause();
    SoundY.currentTime = 0;
    SoundY.play();

    //  SoundX.volume = blendX;
    //  // The volume of the audio clip is the value of blendX.

    //  SoundY.volume = blendY;
    //  // The volume of the audio clip is the value of blendY.

    //  SoundX.play();
    //  // Play the sound object in the SoundX variable.

    //  SoundY.play();
    //  // Play the sound object in the SoundX variable.
  });
}
//#endregion

// #region Click Function
function OnUserClick() {
  cnv.addEventListener("mousedown", (e) => {
    YSoundsStart.forEach((sound) => sound.play().catch(() => {}));
    YSoundsEnd.forEach((sound) => sound.play().catch(() => {}));
    XSoundsStart.forEach((sound) => sound.play().catch(() => {}));
    XSoundsEnd.forEach((sound) => sound.play().catch(() => {}));

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
  //   console.log(seconds.toFixed(2));

  requestAnimationFrame(draw_frame);
};
// #endregion

draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;

  CanvasCentreX = innerWidth / 2;
  CanvasCentreY = innerHeight / 2;
};

setup();
