var MIN_RGB_VALUE = 0x00;
var MAX_RGB_VALUE = 0xff;
var MIN_DEGREES = 0;
var MAX_DEGREES = 359;
var MIN_SATURATION = 0;
var MAX_SATURATION = 100;
var MIN_HSV_VALUE = 0;
var MAX_HSV_VALUE = 100;
export function RGBAtoHSV(rgb) { }
export function HSVtoRGBA(rgb) { }
export function newRGBA(red, green, blue, alpha) {
    if (alpha === void 0) { alpha = 0xff; }
    validateColorValueLimits(red, MIN_RGB_VALUE, MAX_RGB_VALUE);
    validateColorValueLimits(green, MIN_RGB_VALUE, MAX_RGB_VALUE);
    validateColorValueLimits(blue, MIN_RGB_VALUE, MAX_RGB_VALUE);
    validateColorValueLimits(alpha, MIN_RGB_VALUE, MAX_RGB_VALUE);
    return { red: red, green: green, blue: blue, alpha: alpha };
}
export function newHSV(hue, saturation, value) {
    validateColorValueLimits(hue, MIN_DEGREES, MAX_DEGREES);
    validateColorValueLimits(saturation, MIN_SATURATION, MAX_SATURATION);
    validateColorValueLimits(value, MIN_HSV_VALUE, MAX_HSV_VALUE);
    return { hue: hue, saturation: saturation, value: value };
}
export function RGBAfromString(rgba) {
    if (rgba.startsWith("#")) {
        rgba = rgba.substring(1);
    }
    var red = parseValueFromHexString(rgba.substring(0, 2));
    var green = parseValueFromHexString(rgba.substring(2, 4));
    var blue = parseValueFromHexString(rgba.substring(4, 6));
    var alpha = 0xff;
    if (rgba.length > 6) {
        alpha = parseValueFromHexString(rgba.substring(6, 8));
    }
    return newRGBA(red, green, blue, alpha);
}
function validateColorValueLimits(value, min_limit, max_limit) {
    if (value < min_limit) {
        throw new Error("Value=".concat(value, " should be equal or greater to ").concat(min_limit));
    }
    if (value > max_limit) {
        throw new Error("Value=".concat(value, " should be less or equal to ").concat(max_limit));
    }
}
function parseValueFromHexString(value) {
    return Number.parseInt(value, 16);
}
