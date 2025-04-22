document.body.style.margin = "0";
document.body.style.overflow = "hidden";

const cnv = document.getElementById("cnv_element");
cnv.width = innerWidth;
cnv.height = innerHeight;

//cnv.width = 600;
// cnv.height = 400;

const ctx = cnv.getContext("2d");

let stars = [];

function setup() {
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }
  requestAnimationFrame(draw_frame);
}

const draw_frame = (ms) => {
  ctx.fillStyle = "black";
  //   ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  const seconds = ms / 1000;
  //   console.log(seconds.toFixed(2));

  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].update();
  }

  requestAnimationFrame(draw_frame);
};

requestAnimationFrame(draw_frame);

class Star {
  constructor(x, y, size, speed) {
    this.x = random(innerWidth);
    this.y = random(innerHeight);
    this.size = random(1, 5);
    this.speed = random(1, 3);
  }
  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    // Should technically move the stars.
    this.x += this.speed;

    // Should reset the stars positions when they go off screen.
    if (this.x < -this.size) {
      this.x = innerWidth + this.size;
      this.y = random(innerHeight);
    }
  }
}

// draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};
