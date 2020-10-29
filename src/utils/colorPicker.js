const toHex = (c) => {
    const hex = Number(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (rgb) => {
    return toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2]);
};

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
        : null;
};

const rgbNumbers = (rgb) => {
    return rgb.replace(/[^0-9,]/g, '').split(',');
};

export {
    rgbToHex,
    hexToRgb,
    rgbNumbers
};
