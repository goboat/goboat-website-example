import { DefaultTheme } from 'styled-components';
import { getPixelClamp, getRemClamp } from '../lib/utils';
import { ButtonSize } from '../sub-components/buttons/button';

const GRID_INNER_WIDTH = 1440;
const GRID_OUTER_MARGIN = 80;
const GRID_EXTENDED_COLUMN_MIN_WIDTH = 50;
const GRID_EXTENDED_COLUMN_MAX_WIDTH = 160;

export enum SpacingValue {
  none = 'none',
  xsmall = 'xsmall',
  xsmallx = 'xsmallx',
  small = 'small',
  smallx = 'smallx',
  medium = 'medium',
  mediumX = 'mediumX',
  mediumXX = 'mediumXX',
  mediumXXX = 'mediumXXX',
  large = 'large',
  xlarge = 'xlarge',
  xxlarge = 'xxlarge',
}

const fonts = {
  montserratLight: 'Montserrat-Light',
  montserratRegular: 'Montserrat-Regular',
  montserratMedium: 'Montserrat-Medium',
  montserratSemiBold: 'Montserrat-SemiBold',
  montserratVariable: 'Montserrat-Variable',

  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
  interVariable: 'Inter-Variable',

  fallback:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
};

const fontSizes = {
  desktop: {
    heading1: getRemClamp(64),
    heading2: getRemClamp(38),
    heading3: getRemClamp(28),
    text: getRemClamp(24),
    smallText: getRemClamp(18, { minPixelValue: 14 }),
    link: getRemClamp(19),
    inspirational: getRemClamp(48),
    button: {
      [ButtonSize.link]: getRemClamp(19),
      [ButtonSize.extraSmall]: getRemClamp(16),
      [ButtonSize.small]: getRemClamp(18),
      [ButtonSize.medium]: getRemClamp(22),
      [ButtonSize.large]: getRemClamp(28),
      [ButtonSize.full]: getRemClamp(28),
    },
  },
  mobile: {
    heading1: '2.375rem',
    heading2: '1.625rem',
    heading3: '1.125rem',
    text: '1rem',
    smallText: '0.875rem',
    link: '1rem',
    inspirational: '1.625rem',
    button: {
      [ButtonSize.link]: '1rem',
      [ButtonSize.extraSmall]: '1rem',
      [ButtonSize.small]: '1rem',
      [ButtonSize.medium]: '1rem',
      [ButtonSize.large]: '1rem',
      [ButtonSize.full]: '1rem',
    },
  },
};

export const colors: Record<string, string> = {
  white: '#FFF',

  gray05: '#F2F2F2',
  gray10: '#E6E7E8',
  gray15: '#D9D9D9',
  inactive: '#D1CFCD',

  jet: '#333233',
  charcoal: '#44535F',

  aquamarine: '#8ACCBB',
  cornflowerBlue: '#97A3D3',
  naplesYellow: '#FFDF64',
  apricot: '#FFD8BE',

  gray: '#979797',
  purple: '#6200EE',
  red: '#B22020',

  blueishGray: '#44535F',
  urban: '#0E5FAB',
  safety: '#F66B33',
  social: '#FFC76B',
  green: '#349A77',
};

export const spacing: Record<SpacingValue, number> = {
  none: 0,
  xsmall: 8,
  xsmallx: 12,
  small: 16,
  smallx: 24,
  medium: 32,
  mediumX: 40,
  mediumXX: 48,
  mediumXXX: 56,
  large: 64,
  xlarge: 80,
  xxlarge: 104,
};

const breakpoints = {
  tablet: 768,
  desktop: 1181,
  desktopLarge: 1651,
  extendedGrid:
    GRID_INNER_WIDTH + 2 * GRID_OUTER_MARGIN + 2 * GRID_EXTENDED_COLUMN_MIN_WIDTH,
};

export const goboat: DefaultTheme = {
  name: 'GOBOAT',

  /* Fonts */
  fontHeadingLight: fonts.montserratLight,
  fontHeadingRegular: fonts.montserratRegular,
  fontHeadingMedium: fonts.montserratMedium,
  fontHeadingSemiBold: fonts.montserratSemiBold,
  fontHeadingVariable: fonts.montserratVariable,

  fontBodyRegular: fonts.interRegular,
  fontBodyMedium: fonts.interMedium,
  fontBodySemiBold: fonts.interSemiBold,
  fontBodyVariable: fonts.interVariable,

  fontFallback: fonts.fallback,

  /* Font sizes */

  fontSizes: fontSizes,

  /* Colors */

  white: colors.white,

  colorPrimary: colors.aquamarine,
  colorSecondary: colors.gray15,
  colorInactive: colors.inactive,

  colorTextPrimary: colors.jet,
  colorTextSecondary: colors.charcoal,
  colorTextDark: colors.jet,
  colorTextLight: colors.white,
  colorLight: colors.gray05,

  colorLinkHover: colors.urban,

  colorPageBackground: colors.white,

  colorBurgerMenuBackground: colors.charcoal,
  colorBurgerMenuDesktop: colors.jet,
  colorBurgerMenuDark: colors.charcoal,
  colorBurgerMenuLight: colors.white,
  colorMenuBackground: colors.gray05,
  colorMenuLinksDark: colors.jet,
  colorMenuLinksLight: colors.gray05,
  colorBackgroundButton: colors.charcoal,
  colorTextButtonOnHover: colors.white,

  colorLangSelectBackground: colors.white,
  colorLangSelectBorder: colors.jet,
  colorLangSelectText: colors.jet,
  colorLangSelectHover: colors.gray05,

  colorFooterBackground: colors.gray05,
  colorFooterText: colors.jet,
  colorFooterLink: colors.jet,

  colorButtonBackgroundPrimary: colors.charcoal,
  colorButtonTextPrimary: colors.gray05,

  colorButtonBackgroundSecondary: 'transparent',
  colorButtonBorderSecondary: colors.charcoal,
  colorButtonTextSecondary: colors.charcoal,
  colorButtonBackgroundSecondaryHover: colors.charcoal,
  colorButtonBorderSecondaryHover: colors.charcoal,
  colorButtonTextSecondaryHover: colors.white,

  colorButtonBackgroundLink: colors.gray05,
  colorButtonTextLink: colors.charcoal,
  colorButtonShadowLink: colors.jet,

  colorButtonBackgroundSocial: colors.gray05,
  colorButtonTextSocial: colors.charcoal,
  colorButtonShadowSocial: colors.jet,

  colorButtonBackgroundFeatured: colors.gray05,

  colorButtonBackgroundMenu: 'transparent',
  colorButtonBackgroundMenuHover: colors.charcoal,
  colorButtonTextMenu: colors.jet,
  colorButtonTextMenuHover: colors.white,
  colorButtonBorderMenu: colors.jet,
  colorButtonBorderMenuHover: colors.charcoal,

  colorHeroHeadlineLight: colors.white,
  colorHeroHeadlineDark: colors.jet,

  colorBorder: colors.charcoal,

  colorNoImageBackground: colors.gray05,

  colorSectionTagBorder: colors.charcoal,

  colors: {
    dark: colors.jet,
    light: colors.white,
    grey: colors.gray05,
    white: colors.white,
    inputBackground: colors.gray05,
    seeAlsoBackground: colors.gray05,
    factBoxBackground: colors.gray05,
    factBoxText: colors.jet,
    pricingTableBorderColor: colors.blueishGray,
    pricingTableHoverColor: colors.gray05,
  },

  /* Spacing */
  spacing: spacing,

  /* Breakpoints */
  breakpoints: breakpoints,

  /* Grid */
  grid: {
    innerWidth: GRID_INNER_WIDTH,
    extendedColumnMinWidth: GRID_EXTENDED_COLUMN_MIN_WIDTH,
    extendedColumnMaxWidth: GRID_EXTENDED_COLUMN_MAX_WIDTH,
    padding: 0,
    gap: 24,
    outerMargin: GRID_OUTER_MARGIN,
    columnCount: 12,
    mobile: {
      gap: 0,
      outerMargin: 16,
      columnCount: 4,
    },
  },

  /** Buttons */
  buttons: {
    borderRadius: '100px',
    padding: {
      desktop: {
        [ButtonSize.link]: `${getPixelClamp(8)} ${getPixelClamp(32)}`,
        [ButtonSize.extraSmall]: `${getPixelClamp(8)} ${getPixelClamp(16)}`,
        [ButtonSize.small]: `${getPixelClamp(12)} ${getPixelClamp(32)}`,
        [ButtonSize.medium]: `${getPixelClamp(16)} ${getPixelClamp(46)}`,
        [ButtonSize.large]: `${getPixelClamp(22)} ${getPixelClamp(56)}`,
        [ButtonSize.full]: `${getPixelClamp(22)} ${getPixelClamp(56)}`,
      },
      mobile: {
        [ButtonSize.link]: '8px 32px',
        [ButtonSize.extraSmall]: '8px 16px',
        [ButtonSize.small]: '14px 44px',
        [ButtonSize.medium]: '14px 44px',
        [ButtonSize.large]: '14px 44px',
        [ButtonSize.full]: '14px 44px',
      },
    },
  },

  menu: {
    height: {
      desktop: {
        open: '42.67px',
        closed: '38px',
      },
      mobile: {
        open: '120px',
        closed: '48px',
      },
    },
    padding: {
      desktop: '6px 21.33px',
      mobile: '',
    },
  },
};
