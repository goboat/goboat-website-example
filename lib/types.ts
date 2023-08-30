import { ContentBlock } from '../components/dynamic-module-generator';

export type VisibilityOptions = {
  desktop: boolean;
  mobile: boolean;
};

export enum Locale {
  en = 'en',
  da = 'da',
  de = 'de',
  se = 'se',
  it = 'it',
  fr = 'fr',
  es = 'es',
}

export interface ContentServiceItem {
  key: string;
  content: GenericContentType;
}

export interface GenericContentType {
  post_title?: string;
  tags?: string[];
  featured_info?: {
    image?: {
      url: string;
      blurDataURL?: string;
      width: number;
      height: number;
    };
    teaser?: string;
  };
  permalink: string;
  adjusted_permalink?: string;
  date_published?: string;
  blocks?: ContentBlock[];
}

export interface AutopopulatedContentType extends GenericContentType {
  __reference: string;
}
