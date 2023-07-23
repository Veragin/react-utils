import { assertNotNullish } from './basic/typeguards';

export const getCanvas = (w: number, h: number) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
};

export const loadImageData = (path: string) =>
    new Promise<ImageData>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = getCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            if (ctx === null) {
                reject('No context');
                return;
            }
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, img.width, img.height);
            resolve(data);
        };
        img.src = path;
    });

const PIXEL_RATIO = window.devicePixelRatio;
export const setupCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    assertNotNullish(ctx);

    const rect = canvas.getBoundingClientRect();
    const width = rect.width * PIXEL_RATIO;
    const height = rect.height * PIXEL_RATIO;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
};

export const drawImageCenteredOnCanvas = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext('2d', {
        alpha: false,
    });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // centering
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    const newWidth = canvasRatio < imgRatio ? canvas.width : canvas.height * imgRatio;
    const newHeight = canvasRatio < imgRatio ? canvas.width / imgRatio : canvas.height;
    const xShift = Math.abs(canvas.width - newWidth) / 2;
    const yShift = Math.abs(canvas.height - newHeight) / 2;

    ctx.drawImage(img, xShift, yShift, newWidth, newHeight);
};
