import { useRouter } from 'next/router';
import { locales, defaultLocale } from '../lib/config';
import { isLocale } from '../lib/utils';

export function getLocale(path: string) {
  if (locales.length < 2) {
    return defaultLocale;
  }

  const regexp = new RegExp(`^/(${locales.join('|')})(/|$)`);

  const matches = path.match(regexp);

  const localeString = matches?.[1];

  if (isLocale(localeString)) {
    return localeString;
  }

  return defaultLocale;
}

const useLocale = () => {
  const router = useRouter();

  const path = router.asPath;

  return getLocale(path);
};

export default useLocale;
