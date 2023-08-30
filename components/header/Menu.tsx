import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'styled-components';

import BookButton from './BookButton';
import { BurgerIcon } from './BurgerIcon';
import {
  Container,
  DesktopWrapper,
  DrawerTopContainer,
  MenuItems,
  MenuLink,
} from './style';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import OnlyDesktop from '../only-desktop';
import OnlyMobile from '../only-mobile';
import MenuLogo from '../icons/menu-logo';
import GoBoatConnectLogo from '../icons/goboat-connect-logo';
import LanguageSelect from './LanguageSelect';
import GeneralOptionsContext from '../../lib/general-options-context';
import useFrontPageLink from '../../hooks/use-front-page-link';
import { Locale } from '../../lib/types';

interface MenuItem {
  url: string;
  title: string;
}

export interface MenuProps {
  menuItems: MenuItem[];
  isBurgerMenuOpen: boolean;
  toggleBurgerMenuDisplay: () => void;
  isMobile: boolean;
  activeLocale: Locale;
  buttonLink: string | undefined;
}

export const TopLayerItems = (props: MenuProps) => {
  const {
    menuItems,
    toggleBurgerMenuDisplay,
    isBurgerMenuOpen,
    isMobile,
    activeLocale,
    buttonLink,
  } = props;

  const { asPath } = useRouter();
  const localize = useLocalize();
  const { translations } = useContext(GeneralOptionsContext);
  const { frontPageLink } = useFrontPageLink();

  const homeTitle = localize(Localization.menuHome);

  const translationKey = isMobile ? 'menu_book_button_mobile' : 'menu_book_button';
  const bookButtonText =
    translations?.[translationKey][activeLocale] ?? localize(Localization.book);

  return (
    <MenuItems>
      <OnlyMobile>
        <DrawerTopContainer>
          <LanguageSelect
            mobile={true}
            toggleBurgerMenuDisplay={toggleBurgerMenuDisplay}
          />
          <BurgerIcon
            isMenuOpen={isBurgerMenuOpen}
            toggleBurgerMenuDisplay={toggleBurgerMenuDisplay}
            drawerVariant={true}
          />
        </DrawerTopContainer>

        <MenuLink
          href={frontPageLink}
          isActive={asPath === frontPageLink}
          onClick={() => isBurgerMenuOpen && toggleBurgerMenuDisplay()}
        >
          {homeTitle}
        </MenuLink>
      </OnlyMobile>

      {menuItems.map((item, index) => (
        <MenuLink
          key={item.url + item.title + index}
          href={item.url}
          isActive={asPath === item.url}
          onClick={() => isBurgerMenuOpen && toggleBurgerMenuDisplay()}
        >
          {item.title}
        </MenuLink>
      ))}

      <BookButton
        link={buttonLink}
        onClick={() => isBurgerMenuOpen && toggleBurgerMenuDisplay()}
      >
        {bookButtonText}
      </BookButton>
    </MenuItems>
  );
};

const Menu = (props: MenuProps) => {
  const { isBurgerMenuOpen, toggleBurgerMenuDisplay } = props;
  const theme = useTheme();
  const { frontPageLink } = useFrontPageLink();

  const Logo = theme.name === 'GOBOAT_EXCLUSIVE' ? GoBoatConnectLogo : MenuLogo;

  return (
    <Container open={isBurgerMenuOpen}>
      <NextLink href={frontPageLink}>
        <a
          style={{ display: 'flex' }}
          onClick={() => isBurgerMenuOpen && toggleBurgerMenuDisplay()}
        >
          <Logo />
        </a>
      </NextLink>

      <DesktopWrapper>
        <OnlyDesktop>
          <TopLayerItems {...props} />
        </OnlyDesktop>

        <BurgerIcon
          isMenuOpen={isBurgerMenuOpen}
          toggleBurgerMenuDisplay={toggleBurgerMenuDisplay}
          drawerVariant={false}
        />
      </DesktopWrapper>
    </Container>
  );
};

export default Menu;
