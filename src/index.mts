import * as colors from "./colors.mjs";

const rgb = colors.RGBAfromString("#ff0000ee");

const rgb_to_hsv = colors.RGBAtoHSVA(rgb);
const rgb_to_hsv_to_rgb = colors.HSVAtoRGBA(rgb_to_hsv);

const rgbaDiv = document.getElementById('rgba')!;
rgbaDiv.style.background = colors.RGBAtoString(rgb);

const hsvaDiv = document.getElementById('rgba-to-hsva')!;
hsvaDiv.style.background = colors.HSVAtoString(rgb_to_hsv);

const hsvaToRgbaDiv = document.getElementById('hsva-to-rgba')!;
hsvaToRgbaDiv.style.background = colors.RGBAtoString(rgb_to_hsv_to_rgb);
