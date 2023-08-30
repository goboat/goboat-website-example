import React, { forwardRef, RefObject } from 'react';

import { TopLayerItems } from './Menu';
import { Drawer } from './style';
import OnlyMobile from '../only-mobile';
import BurgerItems from './BurgerItems';
import { Locale } from '../../lib/types';

interface BurgerProps {
  menuItems: any;
  burgerItems: any;
  isBurgerMenuOpen: boolean;
  toggleBurgerMenuDisplay: () => void;
  ref: RefObject<HTMLInputElement>;
  isMobile: boolean;
  activeLocale: Locale;
  buttonLink: string | undefined;
}

export const BurgerMenuDrawer = forwardRef<HTMLInputElement, BurgerProps>(
  (props, ref) => {
    const {
      burgerItems,
      toggleBurgerMenuDisplay,
      isBurgerMenuOpen,
      menuItems,
      isMobile,
      activeLocale,
      buttonLink,
    } = props;

    const topLayerItemsProps = {
      menuItems,
      toggleBurgerMenuDisplay,
      isBurgerMenuOpen,
      isMobile,
      activeLocale,
      buttonLink,
    };

    const burgerItemsProps = {
      burgerItems,
      toggleBurgerMenuDisplay,
    };

    return (
      <Drawer ref={ref} open={isBurgerMenuOpen}>
        <OnlyMobile>
          <TopLayerItems {...topLayerItemsProps} />
        </OnlyMobile>

        <BurgerItems {...burgerItemsProps} />
      </Drawer>
    );
  }
);

BurgerMenuDrawer.displayName = 'BurgerMenuDrawer';
