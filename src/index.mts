import * as colors from "./colors.mjs";
import { RGBAtoString } from "./colors.mjs";

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

function generateNRectangles(n: number) {
  const rects: Rectangle[] = [];
  const baseColorString = '#ff6666ff';
  const baseColor = colors.RGBAfromString(baseColorString);
  const rectColors = colors.generateNComplementaryColorsRGBA(baseColor, n);
  console.log(rectColors);
  let rect: Rectangle;
  for (let i = 0; i < n; i++) {
    rect = {x: i*110, y: i*110, width: 100, height: 100, color: RGBAtoString(rectColors[i])};
    rects.push(rect);
  }
  return rects;
}

function drawRectangles(
  ctx: CanvasRenderingContext2D,
  rectangles: Rectangle[],
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  rectangles.forEach(({x, y, width, height, color}) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  })
}

const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const N = 5;
const rects = generateNRectangles(N);
drawRectangles(ctx, rects);
