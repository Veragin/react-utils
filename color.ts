export const colorConvertorRgb2Hex = (rgba: TColor) => {
    let r = rgba.r.toString(16);
    let g = rgba.g.toString(16);
    let b = rgba.b.toString(16);
    if (r.length < 2) r = "0" + r;
    if (g.length < 2) g = "0" + g;
    if (b.length < 2) b = "0" + b;
    return "#" + r + g + b;
};

export const colorConvertorHex2Rgba = (hex: string, a?: number): TColor => {
    if (hex.charAt(0) !== "#") return { r: 0, g: 0, b: 0, a: a ?? 1 };

    const bigint = parseInt(hex.substring(1, hex.length), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r: r, g: g, b: b, a: a ?? 1 };
};

export type THsvColor = {
    h: number;
    s: number;
    v: number;
    a: number;
};

export const colorToHsv = (color: TColor): THsvColor => {
    const hsv = rgbToHsv(color.r, color.g, color.b);

    return {
        ...hsv,
        a: color.a,
    };
};

export const rgbToHsv = (r: number, g: number, b: number) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);
    const d = cmax - cmin;

    const h =
        d === 0
            ? 0
            : cmax === r
            ? 60 * ((g - b / d) % 6)
            : cmax === g
            ? 60 * ((b - r) / d + 2)
            : 60 * ((r - g) / d + 4);
    const s = cmax === 0 ? 0 : d / cmax;

    return {
        h,
        s,
        v: cmax,
    };
};

export const hsvToRgb = (hsv: THsvColor): TColor => {
    const { h, s, v, a } = hsv;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    if (h < 60) {
        return {
            r: Math.round((c + m) * 255),
            g: Math.round((x + m) * 255),
            b: Math.round(m * 255),
            a,
        };
    }
    if (h < 120) {
        return {
            r: Math.round((x + m) * 255),
            g: Math.round((c + m) * 255),
            b: Math.round(m * 255),
            a,
        };
    }
    if (h < 180) {
        return {
            r: Math.round(m * 255),
            g: Math.round((c + m) * 255),
            b: Math.round((x + m) * 255),
            a,
        };
    }
    if (h < 240) {
        return {
            r: Math.round(m * 255),
            g: Math.round((x + m) * 255),
            b: Math.round((c + m) * 255),
            a,
        };
    }
    if (h < 300) {
        return {
            r: Math.round((x + m) * 255),
            g: Math.round(m * 255),
            b: Math.round((c + m) * 255),
            a,
        };
    }
    return {
        r: Math.round((c + m) * 255),
        g: Math.round(m * 255),
        b: Math.round((x + m) * 255),
        a,
    };
};
