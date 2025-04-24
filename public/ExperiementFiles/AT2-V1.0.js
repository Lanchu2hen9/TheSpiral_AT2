document.body.style.margin = "0";
document.body.style.overflow = "hidden";

const cnv = document.getElementById("cnv_element");
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext("2d");

// AT2-V1.0.js
export function run(simplex) {
  console.log(simplex.noise2D(0.1, 0.2)); // you can now use it here!

  const noise = new SimplexNoise();
  let stars = [];
  // Creates an array to store the Star objects.

  function random(arg1, arg2) {
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
  // In general, this is the randomiser function
  // that randomises values inputted into it.

  class Star {
    constructor(x, y, BaseSize, speed, zoff) {
      this.x = random(innerWidth);
      this.y = random(innerHeight);
      // (this.x, this.y) are the "centre point",
      // of the star.

      this.BaseSize = random(1, 8);
      this.speed = random(1, 2.5);
      this.zoff = random(1000);
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

      const noiseVal = noise.noise2D(this.x * 0.01, this.zoff);
      const mappedSize = this.BaseSize + noiseVal * 2;

      const r = Math.floor(noise.noise2D(this.zoff, 0) * 127 + 128);
      const g = Math.floor(noise.noise2D(this.zoff + 100, 0) * 127 + 128);
      const b = Math.floor(noise.noise2D(this.zoff + 200, 0) * 127 + 128);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

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

        const x = Math.cos(angle) * mappedSize;
        // Start drawing the star at x-coordinate,
        // which is cos(angle) * size of the Star.

        const y = Math.sin(angle) * mappedSize;
        // Start drawing the star at x-coordinate,
        // which is cos(angle) * size of the Star.

        ctx.moveTo(0, 0);
        // Move the drawing cursor to the "centre" of the star.

        ctx.lineTo(x, y);
        // Draws each arm of the Star.
      }

      ctx.strokeStyle = "white";
      // Make the lines drawn be white.

      ctx.lineWidth = 1;
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
      if (this.x < -this.size) {
        // If the centre of the star is less than the right-
        // side of the Star, then the star is off screen.

        this.x = innerWidth + this.BaseSize;
        // Then yeet it to the right side of the screen.

        this.y = random(innerHeight);
        // Places Star on a random position on the y-axis,
        // of the canvas.
      }
    }
  }
  // This is the Star object.

  function setup() {
    for (let i = 0; i < 100; i++) {
      // For one star every time, i interates from
      // 0 to 100.

      stars.push(new Star());
      // Push the created Star objects into the stars array.
    }
    requestAnimationFrame(draw_frame);
    // Calls the draw_frame function.
  }

  const draw_frame = (ms) => {
    ctx.fillStyle = "black";
    // Set the background colour to black.

    ctx.fillRect(0, 0, innerWidth, innerHeight);
    // Fills the entire canvas with black. And resizes the canvas to be
    // the same size as the window.

    const seconds = ms / 1000;
    // Converts the milliseconds to seconds.

    //   console.log(seconds.toFixed(2));

    for (let i = 0; i < stars.length; i++) {
      // For every star in the stars array.

      stars[i].show();
      // Draw the stars.

      stars[i].update();
      // Move the stars's position.
    }

    requestAnimationFrame(draw_frame);
  };

  setup();

  requestAnimationFrame(draw_frame);

  // draw_frame();

  onresize = () => {
    cnv.width = innerWidth;
    cnv.height = innerHeight;
  };
}
