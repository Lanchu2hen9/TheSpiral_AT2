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
  cnv.height = (cnv.width * img.height) / img.width;
  draw(img);
  ImgData = cnv.toDataURL(`image/jpeg`);
  add_glitch();
};
img.src = `./ExperiementFiles/img/LannyGlasses.JPG`;

const RandInt = (max) => Math.floor(Math.random() * max);

const Glitchify = (data, chunk_max, repeats) => {
  const ChunkSize = RandInt(chunk_max / 4) * 4;
  const i = RandInt(data.length - 24 - ChunkSize, data.length) + 24;
  const front = data.slice(0, i);
  const back = data.slice(i + ChunkSize, data.length);
  const result = front + back;
  return repeats == 0 ? result : Glitchify(result, chunk_max, repeats - 1);
};
const glitch_arr = [];

const add_glitch = () => {
  if (!ImgData) {
    console.error("ImgData is not set. Cannot create glitch.");
    return;
  }

  const img = new Image();
  img.onload = () => {
    glitch_arr.push(img);
    if (glitch_arr.length < 12) add_glitch();
    else draw_frame();
  };
  img.src = Glitchify(ImgData, 96, 6);
};

let is_glitching = false;
let glitch_i = 0;

const draw_frame = () => {
  if (is_glitching) draw(glitch_arr[glitch_i]);
  else draw(img);

  const prob = is_glitching ? 0.05 : 0.02;
  if (Math.random() < prob) {
    glitch_i = RandInt(glitch_arr.length);
    is_glitching = !is_glitching;
  }
  requestAnimationFrame(draw_frame);
};

draw_frame();

onresize = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
  draw(img);
};
