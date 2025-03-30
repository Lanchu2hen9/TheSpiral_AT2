// Canvas setup begins here.
document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);
// Canvas setup ends here.

const draw_frame = (ms) => {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  ctx.fillStyle = `#1bb1a3`;
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.fillRect(350, 300, 500, 300);
  // Set line width
  ctx.lineWidth = 12;
  ctx.fillStyle = ` #ffeb03`;
  ctx.fillRect(350, 300, 500, 300);
  ctx.strokeStyle = "#f78a21";
  ctx.strokeRect(350, 300, 500, 300);
  // ctx.strokeRect(x-value, y-value, width, height);

  ctx.fillStyle = `#f78a21`;
  ctx.beginPath();
  ctx.moveTo(351, 297);
  ctx.lineTo(600, 100);
  ctx.lineTo(852, 297);
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = "#f78a21";
  ctx.stroke();

  ctx.fillStyle = `#ffeb03`;

  ctx.beginPath();
  ctx.moveTo(540, 450);
  ctx.lineTo(660, 450);
  ctx.lineTo(660, 600);
  ctx.lineTo(540, 600);
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = `#f78a21`;
  ctx.stroke();

  ctx.fillStyle = `#f78a21`;

  ctx.beginPath();
  ctx.ellipse(639, 522, 7, 7, 0, 0, Math.PI * 2);
  ctx.lineWidth = 1;
  ctx.fill();
  // ctx.ellipse(x-coord, y-coord, HoriThiccness, VerticalThiccness, 0, 0, Math.PI * 2);
  ctx.closePath();

  requestAnimationFrame(draw_frame);
};

draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};
