import { Locale } from './types';

export const flattenBlocks = (blocks: any) => {
  const flattened = blocks.flatMap((block: any) => {
    if (Array.isArray(block.blocks) && block.blocks.length > 0) {
      const childBlocks = flattenBlocks(block.blocks);
      return [block, ...childBlocks];
    } else {
      return [block];
    }
  });

  return flattened;
};

export const isLocale = (value: any): value is Locale => {
  return Object.values(Locale).includes(value as Locale);
};

export const getCleanMediaUrl = (rawUrl: string | undefined) => {
  if (!rawUrl) return '';

  return rawUrl.replace(/https:\/\/.+?\//, '/') ?? '';
};

// Taken from booking frontend
interface HexToRgbOptions {
  opacity?: number;
}

export const hexToRgb = (hex: string, { opacity = 100 }: HexToRgbOptions = {}) => {
  if (
    (hex && [7, 4].includes(hex.length) && hex.indexOf('#') === 0) ||
    (hex && [6, 3].includes(hex.length) && hex.indexOf('#') === -1)
  ) {
    const modifyHex = (hex: string) => {
      if (hex.length === 4) {
        hex = hex.replace('#', '');
      }
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      return hex;
    };

    let rgb = [];
    hex = hex.replace('#', '');

    if (hex.length !== 6) {
      hex = modifyHex(hex);
    }

    rgb.push(parseInt(hex.slice(0, 2), 16));
    rgb.push(parseInt(hex.slice(2, 4), 16));
    rgb.push(parseInt(hex.slice(4, 6), 16));

    opacity = opacity / 100;

    return `rgb(${rgb.toString()},${opacity})`;
  }
  console.warn(`hexToRgb: not converted - invalid argument (arg: ${hex})`);
  return hex;
};

export const hasProperty = <Obj, Prop extends string>(
  obj: Obj,
  prop: Prop
): obj is Obj & Record<Prop, unknown> => Object.prototype.hasOwnProperty.call(obj, prop);

const BASE_FONT_SIZE = 16;
const LARGE_DESKTOP_WIDTH = 1920;
const SMALL_DESKTOP_WIDTH = 1280;
const SCALE_FACTOR = LARGE_DESKTOP_WIDTH / SMALL_DESKTOP_WIDTH;

interface GetRemClampOptions {
  minPixelValue?: number;
}

export const getRemClamp = (maxPixelValue: number, options?: GetRemClampOptions) => {
  const minPixelValue =
    options?.minPixelValue ?? (maxPixelValue / SCALE_FACTOR).toFixed(2);

  const minRemValue = (Number(minPixelValue) / BASE_FONT_SIZE).toFixed(2);
  const maxRemValue = (maxPixelValue / BASE_FONT_SIZE).toFixed(2);

  const devideFactor = Number((LARGE_DESKTOP_WIDTH / maxPixelValue).toFixed(2));
  const responsiveValue = `calc(${minRemValue}rem + calc(calc(100vw - ${SMALL_DESKTOP_WIDTH}px)/${devideFactor}))`;

  return `clamp(${minRemValue}rem, ${responsiveValue}, ${maxRemValue}rem)`;
};

export const getPixelClamp = (maxPixelValue: number) => {
  const minPixelValue = (maxPixelValue / SCALE_FACTOR).toFixed(2);
  const responsiveValue = ((maxPixelValue / LARGE_DESKTOP_WIDTH) * 100).toFixed(2);

  return `clamp(${minPixelValue}px, ${responsiveValue}vw, ${maxPixelValue}px)`;
};
