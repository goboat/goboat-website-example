// styled.d.ts
import 'styled-components';
import { SpacingValue } from './styles/Theme';
import { ButtonSize } from './sub-components/buttons/button';
/**
 * This is a 'contract' for what a theme needs to have
 */
declare module 'styled-components' {
  export type Theme = 'GOBOAT' | 'GOBOAT_EXCLUSIVE';

  export interface DefaultTheme {
    /* Make theme name available */
    name: Theme;

    /* Fonts */
    fontHeadingLight: string;
    fontHeadingRegular: string;
    fontHeadingMedium: string;
    fontHeadingSemiBold: string;
    fontHeadingVariable: string;

    fontBodyRegular: string;
    fontBodyMedium: string;
    fontBodySemiBold: string;
    fontBodyVariable: string;

    fontFallback: string;

    /* Font sizes */
    fontSizes: {
      desktop: {
        heading1: string;
        heading2: string;
        heading3: string;
        text: string;
        smallText: string;
        link: string;
        inspirational: string;
        button: {
          [ButtonSize.link]: string;
          [ButtonSize.extraSmall]: string;
          [ButtonSize.small]: string;
          [ButtonSize.medium]: string;
          [ButtonSize.large]: string;
          [ButtonSize.full]: string;
        };
      };
      mobile: {
        heading1: string;
        heading2: string;
        heading3: string;
        text: string;
        smallText: string;
        link: string;
        inspirational: string;
        button: {
          [ButtonSize.link]: string;
          [ButtonSize.extraSmall]: string;
          [ButtonSize.small]: string;
          [ButtonSize.medium]: string;
          [ButtonSize.large]: string;
          [ButtonSize.full]: string;
        };
      };
    };

    /* Colors */
    white: string;
    colorPrimary: string;
    colorSecondary: string;
    colorInactive: string;

    colorTextPrimary: string;
    colorTextSecondary: string;
    colorTextDark: string;
    colorTextLight: string;
    colorLight: string;

    colorLinkHover: string;

    colorPageBackground: string;

    colorMenuBackground: string;

    colorFooterBackground: string;
    colorFooterText: string;
    colorFooterLink: string;

    colorButtonBackgroundPrimary: string;
    colorButtonTextPrimary: string;

    colorButtonBackgroundSecondary: string;
    colorButtonBorderSecondary: string;
    colorButtonTextSecondary: string;
    colorButtonBackgroundSecondaryHover: string;
    colorButtonBorderSecondaryHover: string;
    colorButtonTextSecondaryHover: string;

    colorButtonBackgroundLink: string;
    colorButtonTextLink: string;
    colorButtonShadowLink: string;

    colorButtonBackgroundSocial: string;
    colorButtonTextSocial: string;
    colorButtonShadowSocial: string;

    colorButtonBackgroundFeatured: string;

    colorButtonBackgroundMenu: string;
    colorButtonBackgroundMenuHover: string;
    colorButtonTextMenu: string;
    colorButtonTextMenuHover: string;
    colorButtonBorderMenu: string;
    colorButtonBorderMenuHover: string;

    colorPageBackground: string;

    colorHeroHeadlineLight: string;
    colorHeroHeadlineDark: string;

    colorBurgerMenuBackground: string;
    colorBurgerMenuDesktop: string;
    colorBurgerMenuDark: string;
    colorBurgerMenuLight: string;
    colorMenuLinksDark: string;
    colorMenuLinksLight: string;
    colorBackgroundButton: string;
    colorTextButtonOnHover: string;

    colorLangSelectBackground: string;
    colorLangSelectBorder: string;
    colorLangSelectText: string;
    colorLangSelectHover: string;

    colorBorder: string;

    colorNoImageBackground: string;

    colorSectionTagBorder: string;

    /**
     * Colors nested - we should do colors the same way as spaces
     * ie define an enum somewhere and just state here Record<Color, string>;
     */
    colors: {
      dark: string;
      light: string;
      grey: string;
      white: string;
      inputBackground: string;
      seeAlsoBackground: string;
      factBoxBackground: string;
      factBoxText: string;
      pricingTableBorderColor: string;
      pricingTableHoverColor: string;
    };

    spacing: Record<SpacingValue, number>;

    breakpoints: {
      tablet: number;
      desktop: number;
      desktopLarge: number;
      extendedGrid: number;
    };

    grid: {
      innerWidth: number;
      extendedColumnMinWidth: number;
      extendedColumnMaxWidth: number;
      padding: number;
      gap: number;
      outerMargin: number;
      columnCount: number;
      mobile: {
        gap: number;
        outerMargin: number;
        columnCount: number;
      };
    };

    /**
     * Button styling
     */
    buttons: {
      borderRadius: string;
      padding: {
        desktop: {
          [ButtonSize.link]: string;
          [ButtonSize.extraSmall]: string;
          [ButtonSize.small]: string;
          [ButtonSize.medium]: string;
          [ButtonSize.large]: string;
          [ButtonSize.full]: string;
        };
        mobile: {
          [ButtonSize.link]: string;
          [ButtonSize.extraSmall]: string;
          [ButtonSize.small]: string;
          [ButtonSize.medium]: string;
          [ButtonSize.large]: string;
          [ButtonSize.full]: string;
        };
      };
    };

    menu: {
      height: {
        desktop: {
          open: string;
          closed: string;
        };
        mobile: {
          open: string;
          closed: string;
        };
      };
      padding: {
        desktop: string;
        mobile: string;
      };
    };
  }
}
