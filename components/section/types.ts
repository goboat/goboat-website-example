import { ContentBlock } from '../dynamic-module-generator';
import { SpacingValue } from '../../styles/Theme';
import {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';

export enum GridOptionValue {
  normal = 'normal',
  extended = 'extended',
  full = 'full',
}

export type GridOptions = {
  left: GridOptionValue;
  right: GridOptionValue;
};

// Extends ContentBlock but overwrites the 'blocks' property
export type ContentSection = Omit<ContentBlock, 'blocks' | 'blockName'> & {
  blocks?: ContentBlock[];
  blockName?: string;

  children?: any | any[];
  backgroundValue?: SectionBackgroundValue;
  backgroundType?: SectionBackgroundType;
  backgroundGridOptions?: GridOptions;
  extendBackground?: boolean;
  preloadImage?: boolean;
  textColor?: SectionTextColor;
  template: { width: string | number }[];
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
  paddingTop: SpacingValue;
  paddingBottom: SpacingValue;
  gridOptions: GridOptions;
  className?: string;
};

export type RenderedSectionProps = ContentSection & {
  style?: object;
  subgrid?: boolean;
  anchorTarget?: string;
};

export type SectionAttributes = {
  id?: string;
};

export type SectionBackgroundType = 'transparent' | 'color' | 'image';
export type SectionBackgroundValue = 'light' | 'grey' | 'dark' | { url: string };
export type SectionBackgroundValueString = Extract<
  SectionBackgroundValue,
  'light' | 'grey' | 'dark'
>;
export type SectionTextColor = 'light' | 'dark';

export interface SectionBackgroundProps {
  backgroundType: SectionBackgroundType;
  backgroundValue?: SectionBackgroundValue;
  gridOptions: GridOptions;
  preloadImage?: boolean;
}

export interface SectionContextType {
  backgroundType: SectionBackgroundType;
  backgroundValue?: SectionBackgroundValue;
  textColor: SectionTextColor;
}

export interface ColorBackgroundProps {
  backgroundStyle: FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<any>>;
  gridOptions: GridOptions;
  theme: DefaultTheme;
}
