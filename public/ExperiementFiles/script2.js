// Canvas setup begins here.
document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

const draw_frame = (ms) => {
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  const cnv = document.createElement(`canvas`);

  cnv.width = 400;
  cnv.height = 400;

  document.body.appendChild(cnv);
  const ctx = cnv.getContext(`2d`);
  // Canvas setup ends here.

  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Set line width
  ctx.lineWidth = 10;

  // Wall
  ctx.strokeRect(75, 140, 150, 110);

  // Door
  ctx.fillRect(130, 190, 40, 60);

  // Roof
  ctx.beginPath();
  ctx.moveTo(50, 140);
  ctx.lineTo(150, 60);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();
};

draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};
