import React from 'react';
import { Burger } from './style';
import { useTheme } from 'styled-components';

interface BurgerIconProps {
  isMenuOpen: boolean;
  toggleBurgerMenuDisplay: () => void;
  drawerVariant: boolean;
}

export const BurgerIcon = ({
  isMenuOpen,
  toggleBurgerMenuDisplay,
  drawerVariant,
}: BurgerIconProps) => {
  const theme = useTheme();

  function toggleBurger() {
    const mediaQuery = window.matchMedia(`(max-width: ${theme.breakpoints.tablet}px)`);
    const isMobile = mediaQuery.matches;
    //Because there's already a button in the mobile drawer,
    //disable this button if it is redundant on mobile when the drawer is open
    if (!drawerVariant && isMenuOpen && isMobile) {
      return;
    }
    toggleBurgerMenuDisplay();
  }

  return (
    <Burger
      aria-label="Open menu"
      open={isMenuOpen}
      drawerVariant={drawerVariant}
      onClick={toggleBurger}
    >
      <span className="span1"></span>
      <span className="span2"></span>
      <span className="span3"></span>
    </Burger>
  );
};
