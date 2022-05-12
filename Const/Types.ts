export type TPoint = {
    x: number;
    y: number;
};

export type TRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type TSize = {
    width: number;
    height: number;
};

export type TColor = null | {
    r: number;
    g: number;
    b: number;
    a: number;
};

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
