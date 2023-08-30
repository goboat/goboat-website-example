import { Locale } from '../types';
import daLocalizations from './da';
import deLocalizations from './de';
import enLocalizations from './en';
import esLocalizations from './es';
import frLocalizations from './fr';
import itLocalizations from './it';
import seLocalizations from './se';

export enum Localization {
  loadMore = 'loadMore',
  eventsUpcoming = 'eventsUpcoming',
  eventsAll = 'eventsAll',
  menuHome = 'menuHome',
  search = 'search',
  lastUpdated = 'lastUpdated',
  relatedArticles = 'relatedArticles',
  seeAlso = 'seeAlso',
  relatedEvents = 'relatedEvents',
  signUp = 'signUp',
  googleCalendar = 'googleCalendar',
  saveAsIcal = 'saveAsIcal',
  directions = 'directions',
  viewOnGoogleMaps = 'viewOnGoogleMaps',
  eventsInOtherCities = 'eventsInOtherCities',
  book = 'book',
  close = 'close',
  seeMore = 'seeMore',
  readMore = 'readMore',
  signature = 'signature',
  date = 'date',
  photoAttribution = 'photoAttribution',
  /**
   * Waivers
   */
  signWaiver = 'signWaiver',
  signingForMinors = 'signingForMinors',
  addMinor = 'addMinor',
  remove = 'remove',
  waiverFullName = 'waiverFullName',
  waiverState = 'waiverState',
  waiverZip = 'waiverZip',
  waiverPhone = 'waiverPhone',
  waiverBirthDate = 'waiverBirthDate',
  copied = 'copied',
  addSignature = 'addSignature',
  confirmSignatures = 'confirmSignatures',
  waiverSignedBy = 'waiverSignedBy',
  crewSignature = 'crewSignature',
  includingFollowingMinors = 'includingFollowingMinors',
}

const localizations: Record<Locale, Record<Localization, string>> = {
  [Locale.en]: enLocalizations,
  [Locale.da]: daLocalizations,
  [Locale.de]: deLocalizations,
  [Locale.se]: seLocalizations,
  [Locale.it]: itLocalizations,
  [Locale.fr]: frLocalizations,
  [Locale.es]: esLocalizations,
};

export default localizations;
