const MIN_RGB_VALUE = 0x00;
const MAX_RGB_VALUE = 0xff;

const MIN_DEGREES = 0;
const MAX_DEGREES = 359;
const MIN_SATURATION = 0;
const MAX_SATURATION = 100;
const MIN_HSV_VALUE = 0;
const MAX_HSV_VALUE = 100;

export type ColorRGBA = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export type ColorHSVA = {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
};

export function RGBAtoHSVA(rgba: ColorRGBA) {
  const { red, green, blue, alpha } = rgba;
  
  const red_norm = red / 255;
  const green_norm = green / 255;
  const blue_norm = blue / 255;
  
  const min = Math.min(red_norm, green_norm, blue_norm);
  let max = Math.max(red_norm, green_norm, blue_norm);
  
  const chroma = max - min;
  const value = max * 100;
  let saturation = 0;
  if (max !== 0) {
    saturation = chroma / max * 100;
  }
  
  let hue = 0;
  
  if (chroma > 0) {
    switch (max) {
      case red: {
        hue = ((green_norm - blue_norm) / chroma) % 6;
        break;
      }
      case green: {
        hue = (blue_norm - red_norm) / chroma + 2;
        break;
      }
      case rgba.blue: {
        hue = (red_norm - green_norm) / chroma + 4;
        break;
      }
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }
  
  return newHSVA(hue, saturation, value, alpha);
}

export function HSVAtoRGBA(hsva: ColorHSVA) {
  const { hue, saturation, value, alpha } = hsva;
  
  const saturation_norm = saturation / 100;
  const value_norm = value / 100;
  const chroma = value_norm * saturation_norm;
  
  const h = hue / 60;
  const x = chroma * (1 - Math.abs((h % 2) - 1));
  const m = value_norm - chroma;
  
  let red, green, blue;
  
  if (hsva.hue >= 300) {
    red = chroma;
    green = 0;
    blue = x;
  } else if (hsva.hue >= 240) {
    red = x;
    green = 0;
    blue = chroma;
  } else if (hsva.hue >= 180) {
    red = 0;
    green = x;
    blue = chroma;
  } else if (hsva.hue >= 120) {
    red = 0;
    green = chroma
    blue = x;
  } else if (hsva.hue >= 60) {
    red = x;
    green = chroma;
    blue = 0;
  } else {
    red = chroma;
    green = x;
    blue = 0;
  }
  
  red = Math.round((red + m) * 255);
  green = Math.round((green + m) * 255);
  blue = Math.round((blue + m) * 255);
  
  return newRGBA(red, green, blue, alpha)
}

export function newRGBA(
  red: number,
  green: number,
  blue: number,
  alpha: number = 0xff,
) {
  validateColorValueLimits(red, MIN_RGB_VALUE, MAX_RGB_VALUE);
  validateColorValueLimits(green, MIN_RGB_VALUE, MAX_RGB_VALUE);
  validateColorValueLimits(blue, MIN_RGB_VALUE, MAX_RGB_VALUE);
  validateColorValueLimits(alpha, MIN_RGB_VALUE, MAX_RGB_VALUE);
  return { red, green, blue, alpha } as ColorRGBA;
}

export function newHSVA(hue: number, saturation: number, value: number, alpha: number = 0xff) {
  validateColorValueLimits(hue, MIN_DEGREES, MAX_DEGREES);
  validateColorValueLimits(saturation, MIN_SATURATION, MAX_SATURATION);
  validateColorValueLimits(value, MIN_HSV_VALUE, MAX_HSV_VALUE);
  validateColorValueLimits(alpha, MIN_RGB_VALUE, MAX_RGB_VALUE);
  return { hue, saturation, value, alpha } as ColorHSVA;
}

export function RGBAfromString(rgba: string) {
  if (rgba.startsWith("#")) {
    rgba = rgba.substring(1);
  }

  const red = parseValueFromHexString(rgba.substring(0, 2));
  const green = parseValueFromHexString(rgba.substring(2, 4));
  const blue = parseValueFromHexString(rgba.substring(4, 6));

  let alpha = 0xff;
  if (rgba.length > 6) {
    alpha = parseValueFromHexString(rgba.substring(6, 8));
  }

  return newRGBA(red, green, blue, alpha);
}

export function RGBAtoString(rgba: ColorRGBA) {
  let redString = Number(rgba.red).toString(16);
  let greenString = Number(rgba.green).toString(16);
  let blueString = Number(rgba.blue).toString(16);
  let alphaString = Number(rgba.alpha).toString(16);
  return '#' +
    `${redString.length > 1 ? redString : redString + '0'}` +
    `${greenString.length > 1 ? greenString : greenString + '0'}` +
    `${blueString.length > 1 ? blueString : blueString + '0'}` +
    `${alphaString.length > 1 ? alphaString : alphaString + '0'}`
  ;
}

export function HSVAtoString(hsva: ColorHSVA) {
  const rgba = HSVAtoRGBA(hsva);
  return RGBAtoString(rgba);
}

export function generateNColorsHSVA(n: number) {
  let colors: ColorHSVA[] = [];
  
  const base = MAX_DEGREES / n;
  const saturation = 100;
  const value = 100;
  const alpha = 255;
  
  let hue: number;
  let color: ColorHSVA;
  for (let i = 0; i <= n; i++) {
    hue = Math.floor(i * base);
    color = newHSVA(hue, saturation, value, alpha);
    colors.push(color);
  }
  return colors;
}

export function generateNColorsRGBA(n: number) {
  const colorsRGBA: ColorRGBA[] = [];
  let colorsHSVA = generateNColorsHSVA(n);
  
  let colorRGBA: ColorRGBA;
  for (let colorHSVA of colorsHSVA) {
    colorRGBA = HSVAtoRGBA(colorHSVA);
    colorsRGBA.push(colorRGBA)
  }
  
  return colorsRGBA;
}

export function generateNComplementaryColorsHSVA(baseColor: ColorHSVA, n: number) {
  const {hue, saturation, value, alpha} = baseColor;
  
  const colorsHSVA: ColorHSVA[] = [];
  let colorHSVA: ColorHSVA;
  
  const base = MAX_DEGREES / n;
  
  let hueDerived: number;
  for (let i = 0; i <= n; i++) {
    hueDerived = (hue + Math.floor(i * base)) % 360;
    colorHSVA = newHSVA(hueDerived, saturation, value, alpha);
    colorsHSVA.push(colorHSVA);
  }
  
  return colorsHSVA;
}

export function generateNComplementaryColorsRGBA(baseColor: ColorRGBA, n: number) {
  const hsva = RGBAtoHSVA(baseColor);
  const hsvaComplementary = generateNComplementaryColorsHSVA(hsva, n);
  
  const rgbaComplementary: ColorRGBA[] = [];
  let rgba: ColorRGBA;
  for (const color of hsvaComplementary) {
    rgba = HSVAtoRGBA(color);
    rgbaComplementary.push(rgba);
  }
  
  return rgbaComplementary;
}

function validateColorValueLimits(
  value: number,
  min_limit: number,
  max_limit: number
) {
  if (value < min_limit) {
    throw new Error(
      `Value=${value} should be equal or greater to ${min_limit}`
    );
  }
  if (value > max_limit) {
    throw new Error(`Value=${value} should be less or equal to ${max_limit}`);
  }
}

function parseValueFromHexString(value: string) {
  return Number.parseInt(value, 16);
}
