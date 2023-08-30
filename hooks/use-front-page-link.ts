import { useCallback, useContext } from 'react';

import { defaultLocale, locales } from '../lib/config';
import GeneralOptionsContext from '../lib/general-options-context';
import { Locale } from '../lib/types';
import useLocale from './use-locale';

const useFrontPageLink = () => {
  const currentLocale = useLocale();
  const { locations } = useContext(GeneralOptionsContext);

  const getFrontPageLink = useCallback<(locale: Locale) => string>(
    (locale) => {
      const rootLink = locales.length > 1 ? `/${locale || defaultLocale}` : '/';

      // Link to location front page if only one location in country
      if (locations.length === 1) return locations[0].content.pages[locale] ?? rootLink;

      return rootLink;
    },
    [locations]
  );

  const frontPageLink = getFrontPageLink(currentLocale);

  return { frontPageLink, getFrontPageLink };
};

export default useFrontPageLink;
