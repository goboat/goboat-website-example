import styled from 'styled-components';
import {
  fontBodyRegular,
  fontBodySemiBold,
  fontHeadingSemiBold,
} from '../../styles/fonts';

import { Link } from '../../sub-components/Text';
import { mobileGlobeIconSize } from './GlobeIcon';

interface WrapperProps {
  displayOnScroll: boolean;
  drawerHeight: number;
}

export const HeaderWrapper = styled.header<WrapperProps>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  @media print {
    display: none;
  }
`;

export const Container = styled.nav<{ open: boolean }>`
  height: ${(props) =>
    props.open
      ? props.theme.menu.height.mobile.open
      : props.theme.menu.height.mobile.closed};
  padding-top: ${(props) => (props.open ? '60px' : '0px')};
  transition: height 0.4s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) =>
    props.open
      ? '64px 24px 0'
      : `${props.theme.spacing.xsmall}px ${props.theme.spacing.medium}px`};
  background-color: ${(props) => props.theme.colorMenuBackground};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding-top: 0px;
    height: ${(props) =>
      props.open
        ? props.theme.menu.height.desktop.open
        : props.theme.menu.height.desktop.closed};
    position: relative;
    z-index: 3;
    padding: ${(props) => props.theme.menu.padding.desktop};
  }
`;

export const DesktopWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuItems = styled.div`
  gap: ${(props) => props.theme.spacing.xsmall}px;
  margin: 0 0 72px;
  display: grid;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(auto-fit, minmax(0px, auto));
    grid-auto-flow: column;
    gap: ${(props) => props.theme.spacing.mediumXXX}px;
    align-items: center;
    margin: 0 ${(props) => props.theme.spacing.mediumXXX}px 0 0;
  }
`;

export const MenuLink = styled(Link)`
  ${fontBodySemiBold}

  font-size: 30px;
  color: ${(props) => props.theme.colorMenuLinksLight};
  opacity: ${(props) => (props.isActive ? '100' : '70')}%;
  margin: 0;
  line-height: 1.2;
  width: fit-content;

  @media screen and (min-width: 340px) {
    font-size: 49px;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    ${fontHeadingSemiBold}

    line-height: 15px;
    color: ${(props) => props.theme.colorMenuLinksDark};
    font-size: 0.875rem;
    opacity: 100%;
  }
`;

export const DrawerTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface BurgerProps {
  open: boolean;
  onClick?: any;
  drawerVariant: boolean;
}

export const Burger = styled.button<BurgerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: ${({ open }) => (open ? '26px' : '28px')};
  height: 17px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  left: auto;
  right: 28px;
  margin: ${(props) => (props.drawerVariant ? '7px' : '0')}
    ${(props) => (props.drawerVariant ? '4px' : '0')} 0 0;
  opacity: ${({ drawerVariant, open }) => (!drawerVariant && open ? '0' : '1')};
  transition: opacity 0.4s linear;
  z-index: ${({ drawerVariant, open }) => (!drawerVariant && open ? '0' : '4')};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0;
    opacity: 1;
    z-index: 4;
    width: 18.67px;
    height: 11.33px;
  }

  &:focus {
    outline: none;
  }

  span {
    left: ${({ open }) => (open ? '4px' : '0')};
    border-radius: 10px;
    height: 2px;
    width: ${({ open }) => (open ? '25px' : '28px')};
    position: relative;
    transition: all 0.4s ease;

    @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
      width: ${({ open }) => (open ? '13.33px' : '18.67px')};
    }
  }

  .span1 {
    top: -3.6px;
    background: ${(props) =>
      props.open ? props.theme.colorBurgerMenuLight : props.theme.colorBurgerMenuDesktop};
    transform: ${({ open }) =>
      open ? 'rotate(-45deg) translate(-6.4px, 6.4px)' : 'rotate(0)'};
    transform-origin: -6.4px, 6.4px;

    @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
      top: -2.4px;
      transform: ${({ open }) =>
        open ? 'rotate(-45deg) translate(-4.6px, 4.26px)' : 'rotate(0)'};
      transform-origin: -4.26px, 4.26px;
      background: ${(props) => props.theme.colorBurgerMenuDesktop};
    }
  }

  .span2 {
    background: ${(props) =>
      props.open ? props.theme.colorBurgerMenuLight : props.theme.colorBurgerMenuDesktop};
    transform: ${({ open }) => (open ? 'rotate(-90deg)' : 'rotate(0)')};
    opacity: ${({ open }) => (open ? 0 : 1)};

    @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
      background: ${(props) => props.theme.colorBurgerMenuDesktop};
    }
  }

  .span3 {
    top: 3.6px;
    background: ${(props) =>
      props.open ? props.theme.colorBurgerMenuLight : props.theme.colorBurgerMenuDesktop};
    transform: ${({ open }) =>
      open ? 'rotate(-135deg) translate(6.4px, 6.4px)' : 'rotate(0)'};
    transform-origin: 6.4px, 6.4px;

    @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
      top: 2.4px;
      transform: ${({ open }) =>
        open ? 'rotate(-135deg) translate(4.26px, 4.26px)' : 'rotate(0)'};
      transform-origin: 4.26px, 4.26px;
      background: ${(props) => props.theme.colorBurgerMenuDesktop};
    }
  }
`;

interface DrawerProps {
  open: boolean;
  onClick?: any;
}

export const Drawer = styled.div<DrawerProps>`
  ${fontBodyRegular}

  display: flex;
  flex-direction: column;
  height: 100vh;
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  transition: transform 0.4s ease-in-out;
  z-index: 2;
  width: 100%;
  background: ${(props) => props.theme.colorBurgerMenuBackground};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  padding: 54px ${(props) => props.theme.spacing.smallx}px 225px
    ${(props) => props.theme.spacing.smallx}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: auto;
    border-top: 1px solid ${(props) => props.theme.colorBurgerMenuBackground};
    background: ${(props) => props.theme.colorMenuBackground};
    transform: ${(props) =>
      props.open
        ? `translateY(${props.theme.menu.height.desktop.open}) translateZ(-10px)`
        : 'translateY(-100%)'};
    overflow: visible;
    padding: ${(props) => props.theme.spacing.medium}px;
  }
`;

export const SecondaryWrapper = styled.div`
  display: grid;
  gap: ${(props) => props.theme.spacing.medium}px 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, auto));
    justify-content: center;
    gap: 32px ${(props) => props.theme.spacing.xxlarge}px;
    width: 100%;
    padding: 0 16px;
  }
`;

export const SecondaryNav = styled.ul`
  display: grid;
  gap: ${(props) => props.theme.spacing.xsmall}px;
  padding: 0;
  margin: 0;
  list-style: none;
  height: fit-content;
  color: ${(props) => props.theme.colorMenuLinksLight};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    color: ${(props) => props.theme.colorMenuLinksDark};
  }
`;

export const SecondaryTitle = styled.span`
  ${fontBodySemiBold}

  font-size: 0.875rem;
  color: white;
  display: grid;
  cursor: cursor;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    color: ${(props) => props.theme.colorMenuLinksDark};
  }
`;

export const SubLink = styled(Link)`
  ${fontBodyRegular}

  font-size: 0.875rem;
  color: ${(props) => props.theme.colorMenuLinksLight};
  margin: 0;
  opacity: ${(props) => (props.isActive ? '100' : '60')}%;
  width: fit-content;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    color: ${(props) => props.theme.colorMenuLinksDark};
    opacity: 100%;
  }
`;

export const DrawerLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

interface SelectProps {
  disabled: boolean;
  open: boolean;
  mobile: boolean;
  height: number;
}

export const Select = styled.div<SelectProps>`
  display: ${(props) => (props.mobile ? 'flex' : 'none')};
  flex-direction: column;
  position: relative;
  font-weight: 400;
  line-height: 21.78px;
  transition: all 0.4s ease;
  visibility: ${(props) => (props.disabled ? 'hidden' : 'initial')};
  margin-bottom: 42px;
  overflow: hidden;
  transition: all 0.4s ease;
  max-height: ${(props) =>
    props.open ? `${props.height}px` : `${mobileGlobeIconSize}px`};
  width: 100%;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: flex;
    margin-bottom: 0;
    height: fit-content;
    max-height: unset;
    overflow: initial;
    width: unset;
  }
`;

export const StyledSelectButton = styled.button<{ disabled: boolean }>`
  ${fontBodyRegular}

  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 0px transparent;
  gap: 16px;
  color: ${(props) => props.theme.colorMenuLinksLight};
  height: fit-content;
  background-color: transparent;
  z-index: 3;
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  padding: 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: 0.875rem;
    background-color: transparent;
    color: ${(props) => props.theme.colorMenuLinksDark};
    flex-direction: row-reverse;
    white-space: nowrap;
  }
`;

export const StyledDropDown = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-bottom: 1.5px solid ${(props) => props.theme.colorMenuLinksLight};
  padding: 12px 0 16px 0;
  gap: 6px;
  transition: all 0.4s ease;
  z-index: 1;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    position: absolute;
    min-width: 106.67px;
    filter: drop-shadow(0px 4px 4px rgba(51, 50, 51, 0.25));
    right: 0px;
    top: 27.33px;
    background-color: ${(props) => props.theme.colorLangSelectBackground};
    border: 0.7px solid ${(props) => props.theme.colorLangSelectBorder};
    border-radius: 8px;
    padding: 0;
    transform: translateY(0);
    display: ${(props) => (props.open ? 'flex' : 'none')};
    white-space: nowrap;
    gap: 4px;
  }
`;

interface StyledOptionProps {
  active: boolean;
  first: boolean;
  last: boolean;
}

export const StyledOption = styled.button<StyledOptionProps>`
  ${(props) => (props.active ? fontBodySemiBold : fontBodyRegular)}

  font-size: 18px;
  border: 0px transparent;
  background-color: transparent;
  padding: 0px 0px 0px 47px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.colorMenuLinksLight};
  line-height: 21.78px;
  transition: all 0.4s ease;

  svg {
    opacity: 0;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: 0.875rem;
    padding: 5.33px 10.67px;
    color: ${(props) => props.theme.colorLangSelectText};
    border-radius: ${({ first, last }) =>
      !first && !last ? '0px' : first ? '8px 8px 0px 0px' : '0px 0px 8px 8px'};

    svg {
      opacity: ${(props) => (props.active ? '1' : '0')};
    }

    &:hover {
      background-color: ${(props) => props.theme.colorLangSelectHover};
    }
  }
`;

// The height of 31px comes from the globe icon on mobile
export const LanguageSpacer = styled.div<{ mobile: boolean }>`
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  width: 100%;
  height: 31px;
  margin-bottom: 42px;
`;
