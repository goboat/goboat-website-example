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

  publicSansLight: 'PublicSans-Light',
  publicSansRegular: 'PublicSans-Regular',
  publicSansMedium: 'PublicSans-Medium',
  publicSansSemiBold: 'PublicSans-SemiBold',
  publicSansVariable: 'PublicSans-Variable',

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

const gbxColors = {
  white: '#ffffff',
  rust: '#dfb28b',
  jet: '#242B31',
  charcoal: '#6F7479',
  gray: '#dddfe3',
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

export const goboatExclusivetheme: DefaultTheme = {
  name: 'GOBOAT_EXCLUSIVE',

  /* Fonts */
  fontHeadingLight: fonts.publicSansLight,
  fontHeadingRegular: fonts.publicSansRegular,
  fontHeadingMedium: fonts.publicSansMedium,
  fontHeadingSemiBold: fonts.publicSansSemiBold,
  fontHeadingVariable: fonts.publicSansVariable,

  fontBodyRegular: fonts.publicSansRegular,
  fontBodyMedium: fonts.publicSansMedium,
  fontBodySemiBold: fonts.publicSansSemiBold,
  fontBodyVariable: fonts.publicSansVariable,

  fontFallback: fonts.fallback,

  /* Font sizes */

  fontSizes: fontSizes,

  /* Colors */

  white: colors.white,

  colorPrimary: gbxColors.rust,
  colorSecondary: colors.gray15,
  colorInactive: colors.inactive,

  colorTextPrimary: gbxColors.jet,
  colorTextSecondary: gbxColors.charcoal,
  colorTextDark: gbxColors.jet,
  colorTextLight: gbxColors.white,
  colorLight: gbxColors.white,

  colorLinkHover: gbxColors.rust,

  colorPageBackground: gbxColors.white,

  colorBurgerMenuBackground: gbxColors.jet,
  colorBurgerMenuDesktop: gbxColors.jet,
  colorBurgerMenuDark: colors.jet,
  colorBurgerMenuLight: colors.white,
  colorMenuBackground: gbxColors.white,
  colorMenuLinksDark: gbxColors.jet,
  colorMenuLinksLight: colors.gray05,
  colorBackgroundButton: colors.charcoal,
  colorTextButtonOnHover: colors.white,

  colorLangSelectBackground: gbxColors.white,
  colorLangSelectBorder: gbxColors.rust,
  colorLangSelectText: gbxColors.jet,
  colorLangSelectHover: gbxColors.gray,

  colorFooterBackground: gbxColors.jet,
  colorFooterText: gbxColors.white,
  colorFooterLink: gbxColors.rust,

  // Button colors
  colorButtonBackgroundPrimary: gbxColors.rust,
  colorButtonTextPrimary: gbxColors.jet,

  colorButtonBackgroundSecondary: gbxColors.jet,
  colorButtonBorderSecondary: gbxColors.jet,
  colorButtonTextSecondary: gbxColors.white,
  colorButtonBackgroundSecondaryHover: gbxColors.jet,
  colorButtonBorderSecondaryHover: gbxColors.jet,
  colorButtonTextSecondaryHover: gbxColors.white,

  colorButtonBackgroundLink: gbxColors.jet,
  colorButtonTextLink: gbxColors.white,
  colorButtonShadowLink: gbxColors.jet,

  colorButtonBackgroundSocial: gbxColors.jet,
  colorButtonTextSocial: gbxColors.white,
  colorButtonShadowSocial: gbxColors.jet,

  colorButtonBackgroundFeatured: gbxColors.rust,

  colorButtonBackgroundMenu: gbxColors.jet,
  colorButtonBackgroundMenuHover: gbxColors.jet,
  colorButtonTextMenu: gbxColors.white,
  colorButtonTextMenuHover: gbxColors.white,
  colorButtonBorderMenu: gbxColors.jet,
  colorButtonBorderMenuHover: gbxColors.jet,

  colorHeroHeadlineLight: colors.white,
  colorHeroHeadlineDark: colors.jet,

  colorBorder: colors.charcoal,

  colorNoImageBackground: gbxColors.gray,

  colorSectionTagBorder: gbxColors.rust,

  colors: {
    dark: gbxColors.jet,
    light: gbxColors.white,
    grey: gbxColors.gray,
    white: colors.white,
    inputBackground: colors.gray05,
    seeAlsoBackground: colors.gray05,
    factBoxBackground: gbxColors.jet,
    factBoxText: gbxColors.white,
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
        open: '98px',
        closed: '93px',
      },
      mobile: {
        open: '120px',
        closed: '72px',
      },
    },
    padding: {
      desktop: '30px 36px',
      mobile: '',
    },
  },
};
