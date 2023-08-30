import { Locale } from './types';
import { isLocale } from './utils';

// we don't really know what these are
const envLocales = process.env.NEXT_PUBLIC_LOCALES?.split(',') || [];

const safeLocales = envLocales
  .filter((locale) => {
    return isLocale(locale);
  })
  .map((safeLocale) => Locale[safeLocale as Locale]);

export const locales = safeLocales;

export const defaultLocale = isLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE)
  ? process.env.NEXT_PUBLIC_DEFAULT_LOCALE
  : Locale.en;

export const videoHost = process.env.NEXT_PUBLIC_VIDEO_HOST;

export const isBuild = Boolean(process.env.IS_BUILD);

const config = {
  locales,
  defaultLocale,
  videoHost,
  isBuild,
};

export default config;

const siteIdVariable = process.env.NEXT_PUBLIC_CONTENT_SITE_ID;

if (!siteIdVariable) {
  throw new Error('siteId not configured');
}

export const siteId = siteIdVariable;
