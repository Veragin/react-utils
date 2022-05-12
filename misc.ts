import { DeepPartial } from './Const/Types';

export const range = (n: number): number[] => [...(Array(n) as any).keys()];

export const getUniqueId = () => Math.random();

export const applyDeepPartial = <T extends Object>(obj: T, pobj: DeepPartial<T>): T => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (!(key in pobj)) return { ...acc, [key]: value };
        if (
            typeof (pobj as any)[key] === 'object' &&
            (pobj as any)[key] !== null &&
            !Array.isArray((pobj as any)[key])
        ) {
            return { ...acc, [key]: applyDeepPartial((obj as any)[key], (pobj as any)[key]) };
        } else {
            return { ...acc, [key]: (pobj as any)[key] };
        }
    }, {}) as any;
};
