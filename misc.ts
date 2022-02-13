export const range = (n: number): number[] => [...(Array(n) as any).keys()];

export const getUniqueId = () => Math.random();
