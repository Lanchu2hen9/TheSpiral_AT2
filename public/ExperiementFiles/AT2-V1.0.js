import SimplexNoise from "https://cdn.jsdelivr.net/npm/simplex-noise@3.0.0/dist/esm/simplex-noise.js";

const simplex = new SimplexNoise();

const noise = new SimplexNoise();
/**------------------------------------------------------------------------
 *                           Global Variables
 *------------------------------------------------------------------------**/
//#region Global Variables

// Below are arrays used to store the Star, LightningStrikes Objects and html
// audio elements.
let stars = [];
let Zeus = [];

let YSoundsStart = [];
let YSoundsEnd = [];
let XSoundsStart = [];
let XSoundsEnd = [];

// let variables that assigns the default value of the Star object's
// brightness & how they flicker.
let StarBrightness = 170;
let FlickerSize = 2;

// Boolean variables to check if the user has clicked their mouse on the
// canvas or has the sound enabled.
let IsClicked = false;
let soundIsEnabled = false;

// Variables within MouseTracker(); but assigned Globally, so I don't get
// a "this variable is not defined" error.
let RelMouseX = 0;
let RelMouseY = 0;

let XDistance = 0;
let YDistance = 0;

let blendX = 0;
let blendY = 0;

// Is there a better way of declaring the variables for the MouseTracker();
// function, Yes probably, but will I figure out how to do/use the "better"
// way no.

/**============================================
 *               Canvas Centre
 *=============================================**/

// The variables CanvasCentreX and CanvasCentreY are
// the centre point of the opened browser window.
let CanvasCentreX = innerWidth / 2;
let CanvasCentreY = innerHeight / 2;
//#endRegion

const cnv = document.getElementById("cnv_element");
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext("2d");

/**------------------------------------------------------------------------
 *                           Run Function
 *------------------------------------------------------------------------**/
// A function that runs the imported Simplex API,
// and calls the setup(); at the start.

//#region Run Simplex
function run(simplex) {
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  setup();
}
//#endregion

/**------------------------------------------------------------------------
 *                           Preload Function
 *------------------------------------------------------------------------**/
// A function that preloads my audio clips before the web browser opens and loads

//#region Preload Audio
function preload() {
  YSoundsStart = [
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/PosYSounds/NASA2-PosY3.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/PosYSounds/NasaLiftOff-PosY4.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/PosYSounds/Sun-PosY1.mp3"
    ),
  ];
  // YSoundsStart is an array that will hold the sound objects
  // attached to the +y-axis of the canvas.

  YSoundsEnd = [
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/NegYSounds/SeismicEarth-NegY1.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/NegYSounds/TartarusLoop-NegY2.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/NegYSounds/Volcano-NegY5.mp3"
    ),
  ];
  // YSoundsEnd is an array that will hold the sound objects
  // attached to the -y-axis of the canvas.

  XSoundsStart = [
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/PosXSounds/BeachPosX1.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/PosXSounds/BirbsPosX3.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/PosXSounds/WaterfallPosX4.mp3"
    ),
  ];

  // XSoundsStart is an array that will hold the sound objects
  // attached to the +x-axis of the canvas.

  XSoundsEnd = [
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/NegXSounds/CrowdNegX5.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/NegXSounds/MexcioCityNegX4.mp3"
    ),
    new Audio(
      "/ExperiementFiles/audio/AT2-AudioFiles/NegXSounds/OfficeNegX2.mp3"
    ),
  ];
  // XSoundsStart is an array that will hold the sound objects
  // attached to the -x-axis of the canvas.
}
//#endregion

/**------------------------------------------------------------------------
 *                           Objects Section
 *------------------------------------------------------------------------**/
//#region Star Object
class Star {
  constructor(x, y, BaseSize, speed, zoff, r, g, b) {
    this.x = Random(innerWidth);
    this.y = Random(innerHeight);
    // (this.x, this.y) are the "centre point",
    // of the star.

    this.BaseSize = Random(1.5, 9);
    // Determines the size of the star, from
    // size 1 start to size 9 star.

    this.speed = Random(1, 2.5);
    // Determines the speed of the star moving left
    // across the screen.

    this.zoff = Random(1000);
    // Determines how fast the noise field animates across the
    // screen.

    //Is used to create the flickering effect for the stars.

    // The higher the this.zoff value = slower flickering for stars.
    // Lower this.zoff value the faster the flickering of the stars.
  }
  // Constructor function, that defines
  // the instance variables of the Star object.

  show() {
    ctx.save();
    // Save the current state of the shape.

    ctx.translate(this.x, this.y);
    // translate the shape, by this.x
    // and this.y as defined in the constructor.

    this.zoff += 0.01;
    // Animates how fast the stars flicker.

    const NoiseEffect = noise.noise2D(this.x * 0.01, this.zoff);
    // Generates a noise value outputted by the .noise2D();
    //  NoiseEffect is a noise field that outputs [-1, 1].

    const TransformedSize = this.BaseSize + NoiseEffect * FlickerSize;
    // Transformed the BaseSize of the star, based on the NoiseEffect
    // generated by the Simplex Noise field.

    this.r = Math.floor(noise.noise2D(this.zoff, 0) * StarBrightness + 250);
    // Generates a random red value, based on the noise field.

    // For the red channel value
    // Round down the generated noise value to the nearest integer.
    // Step 1. Input zoff value in .nosee2D() function, this is how
    // the star flickers animates over time.
    // Step 2. Multiply the generated noise value by 127, this
    // converts the noise value to a range of [-127, 127].
    // Step 3. [-127 + 128, 127 + 128], which gives [1, 255]

    this.g = Math.floor(
      noise.noise2D(this.zoff + 100, 0) * StarBrightness + 250
    );
    // Generates a random green value, based on the noise field.

    this.b = Math.floor(
      noise.noise2D(this.zoff + 200, 0) * StarBrightness + 250
    );
    // Generates a random blue value, based on the noise field.

    ctx.beginPath();
    // Start drawing the shape.

    const arms = 8;
    // The star shape has 8 arms.

    for (let i = 0; i < arms; i++) {
      // Count from 0 to arms, where
      // arms the max number of arms
      // the star can have.

      const angle = ((Math.PI * 2) / arms) * i;
      // The angle between each of the arms,
      // is 2π ÷ no. of arms.

      const x = Math.cos(angle) * TransformedSize;
      // Start drawing the star at x-coordinate,
      // which is cos(angle) * size of the Star.

      const y = Math.sin(angle) * TransformedSize;
      // Start drawing the star at x-coordinate,
      // which is cos(angle) * size of the Star.

      ctx.moveTo(0, 0);
      // Move the drawing cursor to the "centre" of the star.

      ctx.lineTo(x, y);
      // Draws each arm of the Star.
    }

    ctx.strokeStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
    // Make the lines drawn be white.

    ctx.lineWidth = 2;
    // The thicccness of the lines drawn is 1.
    ctx.stroke();
    // Defines the colour of the lines drawn.

    ctx.restore();
    // Restores the start state of the shape.
    // So basically, it spews out another Star,
    // for the update() function to move.
  }

  update() {
    this.x -= this.speed;
    // Moves the Star.

    // Resets the Star positions when they go off screen.
    if (this.x < -this.BaseSize) {
      // If the centre of the star is less than the right-
      // side of the Star, then the star is off screen.

      this.x = innerWidth + this.BaseSize;
      // Then move it to the right side of the screen.

      this.y = Random(innerHeight);
      // Places Star on a random position on the y-axis,
      // of the canvas.
    }
  }
}
//#endregion

//#region Lightning Object
class LigthningStrikes {
  constructor(x, y, length, generation, alphas, sound) {
    this.x = x;
    // The x-coordinate of where the Lightning strike
    // starts from.

    this.y = y;
    // The y-coordinate of where the Lightning strike
    // starts from.

    this.length = length;
    // How long the Lightning strike is.

    this.generation = generation;
    // Contains the generation of the Lightning strike.
    // And where in the lightning the bolt branches off
    // from.

    this.angle = Math.random() * Math.PI * 2;
    // Chooses a random angle for the lightning strike.

    this.alphas = 1;
    // The transparency of the lightning strike.

    this.child = null;
    // Placeholder to hold the generate child lightning
    // strikes

    this.createChild();
    // Create the a secondary lightning strike, branching
    // off from the main lightning strike.
  }

  createChild() {
    if (this.length > 55 && this.generation < 5) {
      // If the length of the lightning strike
      // is more than 55 pixels, then create a child,
      // stop after the 4th generation is born.

      //Finds the end of each newly created lightning strike,
      // and prepares the (NewX, NewY) coordinates to create
      // the next lightning bolt.
      const NewX = this.x + Math.cos(this.angle) * this.length;
      // The new x-coordinate of the child lightning strike.

      const NewY = this.y + Math.sin(this.angle) * this.length;
      // The new y-coordinate of the child lightning strike.

      this.child = new LigthningStrikes(
        NewX,
        // The new X coordinate of the next bolt, essientally the
        // starting point.
        NewY,
        // The new Y coordinate of the next bolt, essientally the
        // starting point.

        this.length * 0.6,
        // Increase the length of each subsequential lightning
        // bolt by x0.6.

        this.generation + 1
        // Adds a new generation.
      );
      // This instance method creates a new LighningStrike object and assigns it
      // the this.child instance variable.
    }
  }
  update() {
    this.alphas -= 0.00925;
    // Makes the lightning more transparent over time.

    if (this.child) this.child.update();
    // Also fades away the child lightning strike.
  }
  draw(ctx) {
    if (this.alphas < 0) return;
    // If the lightning strike is transparent,
    // then don't bother drawing it.

    ctx.save();
    //Saves the current state of the Canvas.

    ctx.strokeStyle = `rgba(255, 255, 225, ${this.alphas})`;
    // The colour of the lightningstrikes is `R:255, G:255, B:255, this.alpha```

    ctx.lineWidth = 4;
    // The width of the lightningstrikes is 3.

    ctx.beginPath();
    // Cleans the Canvas of all the previous paths, and starts a new path.
    // "Path" as in ✨fancy✨ lines used to draw shapes.

    ctx.moveTo(this.x, this.y);
    // the starting drawing point of the lightning strike.
    // to the specified coordinates.

    const EndX = this.x + Math.cos(this.angle) * this.length;
    // Stop drawing the lightning strike at this EndX coordinate.

    const EndY = this.y + Math.sin(this.angle) * this.length;
    // Stop drawing the lightning strike at this EndY coordinate.

    ctx.lineTo(EndX, EndY);
    // Draw the line from the starting point to the end point.

    ctx.stroke();
    //Draws the stroke of the ligthningStrike shape.

    if (this.child) this.child.draw(ctx);
    // if the current branch as a child, then draw a child.

    ctx.restore();
    // Restores the saved Canvas state as indicated previous in
    // ctx.save();
  }
  isDead() {
    return this.alphas <= 0;
    // Sets alpha/"transparency" of LightningStrike to 0.
  }
}
//#endregion

/**------------------------------------------------------------------------
 *                           Setup Function
 *------------------------------------------------------------------------**/
//#region Setup Function
// The setup function initalises the code by preloading, setting up and creating
// the eventlisteners, and creating the animated effects.

function setup() {
  preload();
  // Initalise the preload function.

  OnUserClick();
  for (let i = 0; i < 100; i++) {
    // For one star every time, i interates from
    // 0 to 100.

    stars.push(new Star());
    // Push the created Star objects into the stars array.
  }

  MouseTracker();
  // Initialises the MouseTracker(); function and creates
  // the eventlistener for the MouseTracker();
  requestAnimationFrame(draw_frame);
  // Calls the draw_frame function.
}
//#endregion

/**--------------------------------------------
 *               Random Function
 *---------------------------------------------**/

// A function that takes the two values, arg1 and
// arg2 and choose random values between those two
// arguments.

// arg2 is always larger than arg1.

//#region Random Function
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

/**------------------------------------------------------------------------
 *                           draw function
 *------------------------------------------------------------------------**/
// The draw_frame function draws and updates the animation every loop.

//#region Draw Function
const draw_frame = (ms) => {
  ctx.fillStyle = "black";
  // Set the background colour to black.

  ctx.fillRect(0, 0, innerWidth, innerHeight);
  // Fills the entire canvas with black.

  const seconds = ms / 1000;
  // Converts the milliseconds to seconds.

  //   console.log(seconds.toFixed(2));
  //Test
  for (let i = Zeus.length - 1; i >= 0; i--) {
    // for each of the elements in the Zeus array,

    Zeus[i].update();
    // Update fade the elements out.

    Zeus[i].draw(ctx);
    // Draw the lightning strikes.

    if (Zeus[i].isDead()) {
      Zeus.splice(i, 1);
    }
    // If the lightning strike is dead, remove it from the array.
  }

  for (let i = 0; i < stars.length; i++) {
    // For every star in the stars array.

    stars[i].show();
    // Draw the stars.

    stars[i].update();
    // Move the stars's position.
  }

  requestAnimationFrame(draw_frame);
};

//#region LightningYeeter:
function LightningYeeter() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  // Sets the background with a semi-transparent
  // black background.

  ctx.fillRect(0, 0, innerWidth, innerHeight);
  // Fills the entire background with the semi-
  // transparent black background.

  for (let i = Zeus.length - 1; i >= 0; i--) {
    // for each element in the Zeus array,

    Zeus[i].update();
    // Fades the LigthningStrikes away.

    Zeus[i].draw(ctx);
    // Draw the main branche of the LightningStrike
    // Object.

    if (Zeus[i].isDead()) Zeus.splice(i, 1);
    // If the LightningStrike, remove it from the
    // Zeus array.
  }
}
//#endregion

//#region OnUserClick Function
function OnUserClick() {
  if (!soundIsEnabled) {
    soundIsEnabled = true;
  }
  // Check if the sound is not enabled.
  // If it is  not enable it then enabled.

  // When the user clicks on the canvas, then
  cnv.addEventListener("mousedown", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    // Assigns the mouse x and y coordinates to the
    // const variables of x and y.

    if (!IsClicked) {
      // If "IsClicked" is false?

      IsClicked = true;
      // Then set "IsClicked" to true.

      StarBrightness = 360;
      // Then set the StarBrightness to 360.

      FlickerSize = 370;
      // Then set the FlickerSize of the Star object
      // to 370.
    }

    // Then after 60000 miliseconds,
    setTimeout(() => {
      IsClicked = false;
      // Set the state of "IsClicked" to false.

      StarBrightness = 170;
      // Set the StarBrightness variable to 170.

      FlickerSize = 2;
      // Set the FlickerSize of the Star Object to 2.
    }, 4000);

    // Creates 15 Ligthningstrikes
    for (let i = 0; i < 15; i++) {
      Zeus.push(new LigthningStrikes(x, y, 800, 0));
      // At the user's mouse x and mouse y position, with
      // an initial branch length of 800, and don't branch
      // off the LightningStrikes that much.
    }
    LightningYeeter();
    // Calls the LightningYeeter(); Function
  });
}
//#endregion

//#region MouseTracker:
function MouseTracker() {
  cnv.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    // mouseX variable that holds the x-coordinate of the mouse,
    // relative to the top left corner of the canvas.

    const mouseY = e.clientY;
    // mouseY variable that holds the y-coordinate of the mouse,
    // relative to the top left corner of the canvas.

    RelMouseX = mouseX - CanvasCentreX;
    // The horizontal distance of the mouse from the relative
    // to the centre of the canvas.

    RelMouseY = mouseY - CanvasCentreY;
    // The vertical distance of the mouse from the relative
    // to the centre of the canvas.

    // Flipping the "positive" y-axis of the Canvas API
    // so that the "positive" y-axis, is UP.
    // Ditto for the x-axis.

    let MaxDistance = Math.sqrt(CanvasCentreX ** 2 + CanvasCentreY ** 2);
    // Essentially pythagorean theorem. Where in a^2 + b^2 = c^2, a is the
    // vertical distance (y-value, CanvasCentreY) and b is the horizontal
    // distance (x-value, CanvasCentreX).

    XDistance = RelMouseX / CanvasCentreX;
    // Calculates the "percentage"/"fraction" of the x-distance from the
    // centre of the canvas. (0,0)
    YDistance = RelMouseY / CanvasCentreY;
    // Calculates the "percentage"/"fraction" of the y-distance from the
    // centre of the canvas. (0,0)

    // This makes it so that the distance from the mouse from the centre
    // of the canvas is independent of whatever value the width and height
    // of the canvas is.

    blendX = Math.abs(XDistance);
    // Creates variable called blendX, and assigning it the absolute value of
    // of XDistance.

    blendY = Math.abs(YDistance);
    // Creates variable called blendY, and assigning it the absolute value of
    // of Distance.

    let TotalBlend = blendX + blendY;
    // The total "loudness" of the audio clips is blendX + blendY.

    let blendXProportion = blendX / TotalBlend;
    // The "proportion" of the loudness of the audio is in relation
    // to the x-axis.

    let blendYProportion = blendY / TotalBlend;
    // The "proportion" of the loudness of the audio is in relation
    // to the y-axis.

    AudioHandler(blendXProportion, blendYProportion);
    // Calls the function AudioHandler.
  });
}
//#endregion

//#startregion AudioBlender
function AudioHandler(blendXProportion, blendYProportion) {
  let SoundX =
    XDistance >= 0
      ? XSoundsStart[Math.floor(Random(0, XSoundsStart.length))]
      : XSoundsEnd[Math.floor(Random(0, XSoundsEnd.length))];
  // 1. Create a variable called SoundX.
  // 2. if the mouse is larger than or equal to 0, then choose a random sound from the XSoundsStart array.
  // 3. If not, then choose a random sound from the XSoundsEnd array.

  let SoundY =
    YDistance >= 0
      ? YSoundsStart[Math.floor(Random(0, YSoundsStart.length))]
      : YSoundsEnd[Math.floor(Random(0, YSoundsEnd.length))];
  // 1. Create a variable called SoundX.
  // 2. if the mouse is larger than or equal to 0, then choose a random sound
  // from the XSoundsStart array.
  // 3. If not, then choose a random sound from the XSoundsEnd array.

  if (!soundIsEnabled) return;
  // This checks if the sound is enabled, if it is it continues the code onto the
  // next couple of lines. If not the stops the code at line 661.

  SoundX.play();
  // Plays the HTML Audio Element that is called SoundX.

  SoundY.play();
  // Plays the HTML Audio Element that is called SoundY.

  SoundX.volume = blendXProportion;
  // The volume of SoundX is equals to the blendXProportion.

  SoundY.volume = blendYProportion;
  // The volume of SoundY is equals to the blendYProportion
}
//#endregion

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;

  CanvasCentreX = innerWidth / 2;
  // CanvasCentreX is redefined here as to recalulate the
  // centre of the Canvas everytime the "window"/browser page
  // is re-sized.

  CanvasCentreY = innerHeight / 2;
  // CanvasCentreY is redefined here as to recalulate the
  // centre of the Canvas everytime the "window"/browser page
  // is re-sized.
};

document.onpointerdown = () => {
  const div = document.getElementById("start");
  // Get the element div with the ID tag called "start"

  div.remove();
  // remove said div.

  MouseTracker();
  // Call the MouseTracker function.

  document.onpointerdown = null;
  // Deletes the event.handler of the onpointerdown function.

  run(simplex);
  // class the run simplex function.
};
