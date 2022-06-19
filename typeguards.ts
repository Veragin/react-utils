export function assert(value: boolean, msg: string): asserts value {
    if (!value) {
        console.error('Assert', msg);

        throw new Error(msg);
    }
}

export function isNullish<T>(value: T | undefined | null): value is null | undefined {
    return value === null || value === undefined;
}

export function assertNotNullish<T>(value: T | undefined | null, msg?: string): asserts value is T {
    assert(value !== null && value !== undefined, msg ?? `Value is not nullish`);
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
