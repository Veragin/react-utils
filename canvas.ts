export const getCanvas = (w: number, h: number) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
};

export const loadImageData = (path: string) =>
    new Promise<ImageData>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = getCanvas(img.width, img.height);
            const ctx = canvas.getContext("2d");
            if (ctx === null) {
                reject("No context");
                return;
            }
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, img.width, img.height);
            resolve(data);
        };
        img.src = path;
    });
