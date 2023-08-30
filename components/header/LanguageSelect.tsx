import { useContext, useRef, useState } from 'react';

import { locales } from '../../lib/config';
import useLocale from '../../hooks/use-locale';
import { Locale } from '../../lib/types';
import GlobeIcon, { mobileGlobeIconSize } from './GlobeIcon';
import CheckMarkIcon from './CheckMarkIcon';
import {
  LanguageSpacer,
  Select,
  StyledDropDown,
  StyledOption,
  StyledSelectButton,
} from './style';
import GeneralOptionsContext from '../../lib/general-options-context';
import useFrontPageLink from '../../hooks/use-front-page-link';

interface LocaleMappings {
  [key: string]: string;
}

interface LanguageSelectProps {
  mobile: boolean;
  disabled?: boolean;
  toggleBurgerMenuDisplay?: () => void;
}

const LanguageSelect = (props: LanguageSelectProps) => {
  const { mobile, disabled = false, toggleBurgerMenuDisplay } = props;
  const { translations } = useContext(GeneralOptionsContext);

  const activeLocale = useLocale();
  const [open, setOpen] = useState(false);
  const { getFrontPageLink } = useFrontPageLink();

  const localeMapping: LocaleMappings = {
    da: 'Danish',
    en: 'English',
    de: 'German',
    sv: 'Swedish',
    es: 'Spanish',
  };

  // for each of the locales in localeMapping, check if we have a translation for
  // it in the currently active locale.
  locales.forEach((locale: string) => {
    if (translations?.[`language_name_${locale}`][activeLocale]) {
      localeMapping[locale] = translations?.[`language_name_${locale}`][activeLocale];
    }
  });

  // These are used for animating the language select on mobile
  const [height, setHeight] = useState(mobileGlobeIconSize);
  const ref = useRef<HTMLDivElement>(null);

  // Dont render if no locales
  if (locales.length < 2) return <LanguageSpacer mobile={mobile} />;

  function changeLocale(locale: Locale) {
    setOpen(false);
    toggleBurgerMenuDisplay?.();

    const localeLink = getFrontPageLink(locale);

    // Trigger "real" page reload so GTM settings is refreshed
    if (window.location) window.location.assign(localeLink);
  }

  const handleOpen = () => {
    const selectHeight = ref.current?.scrollHeight;
    if (selectHeight) setHeight(selectHeight);

    if (!disabled) setOpen(!open);
  };

  return (
    <Select
      mobile={mobile}
      open={open}
      disabled={disabled}
      aria-hidden={disabled}
      ref={ref}
      height={height}
    >
      <StyledSelectButton onClick={handleOpen} disabled={disabled}>
        <GlobeIcon mobile={mobile} />
        <div>{localeMapping[activeLocale]}</div>
      </StyledSelectButton>

      <StyledDropDown open={open}>
        {locales.map((locale) => (
          <StyledOption
            active={locale === activeLocale}
            first={locale === locales[0]}
            last={locale === locales[locales.length - 1]}
            onClick={() => changeLocale(locale)}
            key={locale}
          >
            {localeMapping[locale]}
            <CheckMarkIcon />
          </StyledOption>
        ))}
      </StyledDropDown>
    </Select>
  );
};

export default LanguageSelect;
