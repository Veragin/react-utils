export const colorConvertorRgb2Hex = (rgba: TColor) => {
    let r = rgba.r.toString(16);
    let g = rgba.g.toString(16);
    let b = rgba.b.toString(16);
    if (r.length < 2) r = '0' + r;
    if (g.length < 2) g = '0' + g;
    if (b.length < 2) b = '0' + b;
    return '#' + r + g + b;
};

export const colorConvertorHex2Rgba = (hex: string, a?: number): TColor => {
    if (hex.charAt(0) !== '#') return { r: 0, g: 0, b: 0, a: a ?? 1 };

    var bigint = parseInt(hex.substring(1, hex.length), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return { r: r, g: g, b: b, a: a ?? 1 };
};
