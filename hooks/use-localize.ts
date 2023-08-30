import localizations, { Localization } from '../lib/localizations';
import useLocale from './use-locale';

const useLocalize = () => {
  const lang = useLocale();

  /**
   * Function that localizes a given string
   * @param {String} pattern designation for string to localize
   * @returns {String} localized string
   */
  const localize = (pattern: Localization) => {
    return localizations[lang][pattern];
  };

  return localize;
};

export default useLocalize;
