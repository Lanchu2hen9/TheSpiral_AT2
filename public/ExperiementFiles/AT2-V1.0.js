document.body.style.margin = "0";
document.body.style.overflow = "hidden";

const cnv = document.getElementById("cnv_element");
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext("2d");

let stars = [];

function random(arg1, arg2) {
  if (arguments.length == 1) {
    const max = arg1;
    return Math.random() * max;
  } else if (arguments.length == 2) {
    const min = arg1;
    const max = arg2;
    const range = max - min;
    return Math.random() * range + min;
  }
}

class Star {
  constructor(x, y, size, speed) {
    this.x = random(innerWidth);
    this.y = random(innerHeight);
    this.size = random(1.5, 6.5);
    this.speed = random(1, 3);
  }
  show() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();

    const arms = 8;
    for (let i = 0; i < arms; i++) {
      const angle = ((Math.PI * 2) / arms) * i;
      const x = Math.cos(angle) * this.size;
      const y = Math.sin(angle) * this.size;
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
    }
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.size, 0, Math.PI + 2);
    // ctx.fillStyle = "white";
    // ctx.fill();
  }

  update() {
    // Should technically move the stars.
    this.x -= this.speed;

    // Should reset the stars positions when they go off screen.
    if (this.x < -this.size) {
      this.x = innerWidth + this.size;
      this.y = random(innerHeight);
    }
  }
}

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

setup();

requestAnimationFrame(draw_frame);

// draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};
