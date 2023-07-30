export const EPSILON = 0.00000000001;

/** rotate a around s with angle alpha */
export const rotatePoint = (alpha: number, s: TPoint, a: TPoint) => {
    return {
        x: s.x + Math.cos(alpha) * (a.x - s.x) - Math.sin(alpha) * (a.y - s.y),
        y: s.y + Math.sin(alpha) * (a.x - s.x) + Math.cos(alpha) * (a.y - s.y),
    };
};

/** compute distance between two points */
export const distance = (a: TPoint, b: TPoint) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

export const movePointByDistance = (base: TPoint, direction: TPoint, distance: number) => {
    const rot = Math.atan((direction.y - base.y) / Math.abs(direction.x - base.x));
    const alpha = base.x <= direction.x ? rot : Math.PI - rot;
    return rotatePoint(alpha, base, { x: base.x + distance, y: base.y });
};

export const computeBoundingRectOfMultipleObjects = (data: TRect[]) => {
    // data = [{x,y,width,height}, ...]
    if (!data.length || data.length === 0) return { x: 0, y: 0, width: 0, height: 0 };

    const res = {
        x: data[0].x,
        y: data[0].y,
        width: data[0].width,
        height: data[0].height,
    };
    for (let i = 1; i < data.length; i++) {
        const left = Math.min(res.x - res.width / 2, data[i].x - data[i].width / 2);
        const right = Math.max(res.x + res.width / 2, data[i].x + data[i].width / 2);
        const top = Math.min(res.y - res.height / 2, data[i].y - data[i].height / 2);
        const bot = Math.max(res.y + res.height / 2, data[i].y + data[i].height / 2);
        res.x = (left + right) / 2;
        res.y = (top + bot) / 2;
        res.width = right - left;
        res.height = bot - top;
    }
    return res;
};

export const computeCenterAndSizeOfMultipleNodes = (data: any[]) => {
    // data = [node, node, ...]
    if (!data.length || data.length === 0) return { x: 0, y: 0, width: 0, height: 0, rotation: 0 };
    const res = {
        x: data[0].x(),
        y: data[0].y(),
        width: data[0].width(),
        height: data[0].height(),
        rotation: data[0].rotation(),
    };
    for (let i = 1; i < data.length; i++) {
        const left = Math.min(res.x - res.width / 2, data[i].x() - data[i].width() / 2);
        const right = Math.max(res.x + res.width / 2, data[i].x() + data[i].width() / 2);
        const top = Math.min(res.y - res.height / 2, data[i].y() - data[i].height() / 2);
        const bot = Math.max(res.y + res.height / 2, data[i].y() + data[i].height() / 2);
        res.x = (left + right) / 2;
        res.y = (top + bot) / 2;
        res.width = right - left;
        res.height = bot - top;
    }
    return res;
};

export const isInsideOFRect = (pos: TPoint, rect: TRect) => {
    // x,y = center
    return (
        pos.x >= rect.x - rect.width / 2 &&
        pos.y >= rect.y - rect.height / 2 &&
        pos.x <= rect.x + rect.width / 2 &&
        pos.y <= rect.y + rect.height / 2
    );
};

export const isInsideOFArc = (pos: TPoint, x: number, y: number, radius: number) => {
    return Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)) < radius;
};
