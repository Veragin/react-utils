import { movePointByDistance } from './Math';

describe('movePointByDistance', () => {
    const base: TPoint = { x: 10, y: 10 };
    const distance = 8;

    it('0 angle', () => {
        const res = movePointByDistance(base, { x: 15, y: 10 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 18,
              "y": 10,
            }
        `);
    });

    it('45 angle', () => {
        const res = movePointByDistance(base, { x: 15, y: 15 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 15.65685424949238,
              "y": 15.65685424949238,
            }
        `);
    });
    it('90 angle', () => {
        const res = movePointByDistance(base, { x: 10, y: 15 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 10,
              "y": 18,
            }
        `);
    });

    it('135 angle', () => {
        const res = movePointByDistance(base, { x: 5, y: 15 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 4.34314575050762,
              "y": 15.65685424949238,
            }
        `);
    });

    it('180 angle', () => {
        const res = movePointByDistance(base, { x: 5, y: 10 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 2,
              "y": 10.000000000000002,
            }
        `);
    });

    it('225 angle', () => {
        const res = movePointByDistance(base, { x: 5, y: 5 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 4.3431457505076185,
              "y": 4.34314575050762,
            }
        `);
    });

    it('270 angle', () => {
        const res = movePointByDistance(base, { x: 10, y: 5 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 10,
              "y": 2,
            }
        `);
    });

    it('315 angle', () => {
        const res = movePointByDistance(base, { x: 15, y: 5 }, distance);
        expect(res).toMatchInlineSnapshot(`
            Object {
              "x": 15.65685424949238,
              "y": 4.34314575050762,
            }
        `);
    });
});

export {};
