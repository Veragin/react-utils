export function assert(value: boolean, msg: string): asserts value {
    if (!value) {
        console.error('Assert', msg);

        throw new Error(msg);
    }
}

export function assertNotTRect<T extends Object>(value: T | undefined, msg?: string): asserts value is T & TRect {
    assert(isTRect(value), msg ?? `Value is not type of TRect`);
}

export function isTRect<T extends Partial<TRect>>(value: T | undefined): value is T & TRect {
    return (
        !!value &&
        value.x !== undefined &&
        value.y !== undefined &&
        value.width !== undefined &&
        value.height !== undefined
    );
}
