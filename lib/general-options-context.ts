import * as React from 'react';
import { Theme } from 'styled-components';
import { AutopopulatedLocationContentType } from '../components/locations/locations';
import { GetGeneralOptionsQuery } from './graphql-sdk-content';
import { Locale } from './types';

export interface GeneralOptionsType {
  siteName: string;
  siteUrl: string;
  bookingSystemUrl: string;
  country: string;
  gtmCode: string;
  locations: GetGeneralOptionsQuery['locations'];
  articlesSleeknote: { [key: string]: any };
  eventsSleeknote: { [key: string]: any };
  articleTags: { name: string; slug: string }[];
  social_media_country?: string;
  articlesPages: Partial<Record<Locale, string>>;
  eventsPages: Partial<Record<Locale, string>>;
  globalNoindex: Boolean;
  location?: AutopopulatedLocationContentType;
  theme: Theme;
  translations?: Record<string, Record<string, string>>;
  enableCustomBookingLink: boolean;
  customBookingLink: Partial<Record<Locale, string>>;
}

const defaults: GeneralOptionsType = {
  siteName: '',
  siteUrl: '',
  bookingSystemUrl: '',
  country: '',
  gtmCode: '',
  locations: [],
  articlesSleeknote: {},
  eventsSleeknote: {},
  articleTags: [],
  social_media_country: '',
  articlesPages: {},
  eventsPages: {},
  globalNoindex: true,
  theme: 'GOBOAT',
  translations: {},
  enableCustomBookingLink: false,
  customBookingLink: {},
};

const GeneralOptionsContext = React.createContext<GeneralOptionsType>(defaults);

export default GeneralOptionsContext;
