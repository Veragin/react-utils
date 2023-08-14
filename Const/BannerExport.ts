import { Shape } from 'Service/Nodes';
import { TColor, TPoint, TRect } from './Types';

export type TSetExport = {
    setInfo: {
        id: number;
    };
    extents: TBannerExport[];
};

export type TBannerExport = TRect & {
    id: number;
    extent: string;
    element: TGroup;
};

export type TNode = {
    id: number;
    name: string;
    type: TNodeType;
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
    mirror: TMirror; // values 0 = normal, 1 = horizontal, 2 = vertical, 3 = both
    visible: boolean;
    rotation: number;

    focusable: boolean;
};

export type TMirror = 0 | 1 | 2 | 3;
export type TNodeType = 'text' | 'image' | 'group' | 'ellipse' | 'polygon' | 'masterShape' | 'unknown';
export type TNodeProperty = Partial<TText & TImage & TEllipse & TGroup & TPolygon>;

export type TGroup = TNode & {
    stack: TNodeProperty[];
    collapse: boolean;
    shape: Shape | null;
};

export type TShape = TNode & {
    fill: TColor | null;
    strokeWidth: number;
    strokeColor: TColor | null;
    lineCap: TLineCap;
    lineJoin: TLineJoin;
};

export type TLineCap = 'butt' | 'round' | 'square';
export type TLineJoin = 'bevel' | 'round' | 'miter';

export type TEllipse = TShape & {
    start: number;
    end: number;
    isArc: boolean;
};

export type TArc = TEllipse & {
    radius: number;
};

export type TPolygon = TShape & {
    points: TPoint[];
    borderRadius: number;
};

/******************************************************************
 *********  Text
 ******************************************************************/

export type TText = TShape & {
    fontFamily: string;
    fontSize: number;
    fontWeight: TFontWeight;
    fontStyle: TFontStyle;
    letterSpacing: number;
    lineHeight: number;
    align: TFontAlign;
    textBaseline: TTextBaseLine;
    text: string | string[];
    rowCount: number;
};

export type TFont = {
    fontFamily: string;
    fontWeight: TFontWeight;
};
export type TFontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type TFontStyle = 'normal' | 'italic' | 'oblique';
export type TFontAlign = 'left' | 'center' | 'right';
export type TTextBaseLine = 'top' | 'bottom' | 'middle' | 'alphabetic' | 'hanging';

/******************************************************************
 *********  Image
 ******************************************************************/

export type TImage = TNode & {
    mappingId?: number;
    imgId: number;
    filters: TFilter[];
    blendingMode: TBlendingModeType;
    subimage: TRect;
    img?: string | HTMLImageElement;
};

export type TFilterType = 'sobel' | 'grayscale' | 'brightness' | 'threshold' | 'convolute';
export type TFilterConvoluteType = 'blur' | 'sharp' | 'master' | 'shape' | 'shape1' | 'vertical' | 'horizontal';
export type TFilter =
    | {
          type: 'convolute';
          mode: TFilterConvoluteType;
          opaque?: boolean;
      }
    | {
          type: 'brightness' | 'threshold';
          value: number;
      }
    | {
          type: 'grayscale' | 'sobel';
      };

export type TBlendingModeType =
    | 'normal'
    | 'dissolve'
    | 'darken'
    | 'multiply'
    | 'color burn'
    | 'linear burn'
    | 'darker color'
    | 'lighten'
    | 'screen'
    | 'color dodge'
    | 'linear dodge'
    | 'lighter color'
    | 'overlay'
    | 'soft light'
    | 'hard light'
    | 'vivid light'
    | 'linear light'
    | 'pin light'
    | 'hard mix'
    | 'difference'
    | 'exclusion'
    | 'subtract'
    | 'divide'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
