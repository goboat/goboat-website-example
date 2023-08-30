import React, { useContext, useEffect, useRef, useState } from 'react';

import { BurgerMenuDrawer } from './BurgerMenuDrawer';
import Menu, { MenuProps } from './Menu';

import { HeaderWrapper } from './style';
import useBreakpoint from '../../hooks/use-breakpoint';
import useLocale from '../../hooks/use-locale';
import { useTheme } from 'styled-components';
import GeneralOptionsContext from '../../lib/general-options-context';

export const Header = ({ menu }: any) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const toggleBurgerMenuDisplay = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);
  const items = menu?.resource?.content?.menu ?? [];
  const menuItems: any[] = [];
  const burgerItems: any[] = [];
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const { isMobile } = useBreakpoint();
  const activeLocale = useLocale();
  const theme = useTheme();
  const generalOptions = useContext(GeneralOptionsContext);

  const enableCustomBookingLink = generalOptions.enableCustomBookingLink;
  const customBookingLink = generalOptions.customBookingLink?.[activeLocale];

  if (
    typeof window != 'undefined' &&
    isBurgerMenuOpen &&
    window.innerWidth < theme.breakpoints.tablet
  ) {
    document.body.style.overflow = 'hidden';
  } else if (
    typeof window != 'undefined' &&
    window.innerWidth < theme.breakpoints.tablet
  ) {
    document.body.style.overflow = 'unset';
  }

  const displayMenuOnScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', displayMenuOnScroll);
      return () => {
        window.removeEventListener('scroll', displayMenuOnScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  items?.map((item: { type: string }) => {
    if (item.type !== 'taxonomy') {
      menuItems.push(item);
    } else {
      burgerItems.push(item);
    }
  });

  const MenuProps: MenuProps = {
    menuItems,
    isBurgerMenuOpen,
    toggleBurgerMenuDisplay,
    isMobile,
    activeLocale,
    buttonLink:
      enableCustomBookingLink && customBookingLink ? customBookingLink : undefined,
  };

  const { ref, height } = useDrawerHeight();

  const burgerProps = {
    menuItems,
    burgerItems,
    isBurgerMenuOpen,
    toggleBurgerMenuDisplay,
    ref,
    isMobile,
    activeLocale,
    buttonLink:
      enableCustomBookingLink && customBookingLink ? customBookingLink : undefined,
  };

  return (
    <HeaderWrapper displayOnScroll={showMenu} drawerHeight={height}>
      <Menu {...MenuProps} />
      <BurgerMenuDrawer {...burgerProps} />
    </HeaderWrapper>
  );
};

export const useDrawerHeight = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref && ref?.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [height]);

  return { ref, height, setHeight };
};
