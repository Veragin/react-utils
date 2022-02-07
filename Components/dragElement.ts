export const findId = (e: React.DragEvent<HTMLDivElement>) => {
    let el = document.elementFromPoint(e.clientX, e.clientY);
    while (el) {
        const id = el.getAttribute('data-id');
        if (id) return Number(id);
        el = el.parentElement;
    }
    return null;
};

type TLayerData<T> = {
    id: number;
    stack: T[];
}

export const findLayerWithId = <T extends TLayerData<T>>(layers: T[], id: number): null | T => {
    for (let l of layers) {
        if (l.id === id) return l;
        if (l.stack) {
            const layer = findLayerWithId(l.stack, id);
            if (layer) return layer;
        }
    }
    return null;
};

export const dragElement = document.createElement('div');
dragElement.id = 'layerBarDragElement';
document.body.append(dragElement);

export const startDrag = (e: React.DragEvent<HTMLDivElement>, data: { id: number; name: string }) => {
    e.dataTransfer.setData('text/plain', String(data.id));
    dragElement.textContent = escape(data.name);
    dragElement.style.display = 'block';
    e.dataTransfer.setDragImage(dragElement, 10, 10);
};

export const stopDrag = () => {
    dragElement.style.display = 'none';
};

export const getIdFromDragEvent = (e: React.DragEvent<HTMLDivElement>) => {
    return Number(e.dataTransfer.getData('text/plain'));
};
