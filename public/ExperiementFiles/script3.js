document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = cnv.parentNode.scrollWidth;
cnv.height = (cnv.width * 9) / 16;
cnv.style.backgroundColor = `hotpink`;

const ctx = cnv.getContext(`2d`);

let ImgData;

const draw = (i) => ctx.drawImage(i, 0, 0, cnv.width, cnv.height);

const img = new Image();
img.onload = () => {
  cnv.height = cnv.width(img.width, img.height);
  draw(img);
  ImagData = cnv.toDataURL(`image/jpg`);
  add_glitch();
};
img.src = `./ExperiementFiles/img/LannyGlasses.JPG`;

const draw_frame = (ms) => {
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  const seconds = ms / 1000;
  console.log(seconds.toFixed(2));

  requestAnimationFrame(draw_frame);
};

draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
};
