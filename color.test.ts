import { COLOR } from "./Const/Color";
import { hsvToRgb, colorToHsv } from "./color";

describe("color utils test", () => {
    const colorIds = Object.keys(COLOR) as (keyof typeof COLOR)[];

    it.each(colorIds)("hsvRgb test color %s", (colorId) => {
        const hsv = colorToHsv(COLOR[colorId]);
        const rgb = hsvToRgb(hsv);
        expect(rgb.r).toBe(COLOR[colorId].r);
        expect(rgb.g).toBe(COLOR[colorId].g);
        expect(rgb.b).toBe(COLOR[colorId].b);
        expect(rgb.a).toBe(COLOR[colorId].a);
    });
});

export {};
