import {
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';
import { SpacingValue } from '../../styles/Theme';

export interface EntryContent {
  post_title?: string;
  tags?: string[];
  featured_info?: {
    image?: {
      url: string;
      blurDataURL?: string;
    };
    teaser?: string;
  };
  adjusted_permalink?: string;
  date_published?: string;
  images?: {
    background: {
      url: string;
    };
    map: {
      url: string;
    };
  };
  map?: {
    url: string;
  };
}

export interface AutopopulateError {
  __reference: string;
  __error: number | string;
}

export interface EntryWithPossibleError {
  key: string;
  type: string;
  // todo: replace with generic content type
  content: EntryContent | AutopopulateError;
  overwrites?: {
    title?: string;
    teaser?: string;
  };
}

export interface Entry extends EntryWithPossibleError {
  content: EntryContent;
}

export enum FeaturedContentType {
  cards = 'cards',
  list = 'list',
  carousel = 'carousel',
  articles = 'articles',
}

export type FeaturedContentBackgroundType = 'transparent' | 'color' | 'image';
export type FeaturedContentBackgroundValue = 'light' | 'dark';
export type FeaturedContentTextColor = 'light' | 'dark';

export interface FeaturedContentContextType {
  backgroundType: FeaturedContentBackgroundType;
  backgroundValue?: FeaturedContentBackgroundValue;
  textColor: FeaturedContentTextColor;
}

export interface RawFeaturedContentProps {
  heading: string;
  paragraph?: string;
  linkText?: string;
  linkUrl?: string;
  type: FeaturedContentType;
  entries: EntryWithPossibleError[];
  backgroundType?: FeaturedContentBackgroundType;
  backgroundValue?: FeaturedContentBackgroundValue;
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
  paddingTop: SpacingValue;
  paddingBottom: SpacingValue;
}

export interface FeaturedContentProps extends RawFeaturedContentProps {
  entries: Entry[];
  backgroundStyle: FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<any>>;
}
