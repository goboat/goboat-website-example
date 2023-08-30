import styled, { css } from 'styled-components';
import {
  StyledExpandableFactBoxContent,
  StyledFactBoxContent,
} from '../../components/fact-box/style';
import { getPixelClamp, hexToRgb } from '../../lib/utils';
import { fontHeadingMedium, fontHeadingSemiBold } from '../../styles/fonts';

import { SpacingValue } from '../../styles/Theme';
import { ButtonAlign, ButtonProps, ButtonSize } from './button';
import { ButtonGroupAlignment } from './button-group';

interface BaseButtonProps extends ButtonProps {
  size: ButtonSize;
  align: ButtonAlign;
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
}

const baseButtonCss = css<BaseButtonProps>`
  ${fontHeadingSemiBold}

  font-size: ${(props) => props.theme.fontSizes.mobile.button[props.size]};
  line-height: 1.25;
  white-space: nowrap;

  display: block;

  border: none;
  border-radius: ${(props) => props.theme.buttons.borderRadius};

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  padding: ${(props) => props.theme.buttons.padding.mobile[props.size]};

  margin-top: ${(props) => props.theme.spacing[props.marginTop]}px;
  margin-bottom: ${(props) => props.theme.spacing[props.marginBottom]}px;

  margin-left: ${(props) =>
    props.align === 'center' || props.align === 'right' ? 'auto' : 0};
  margin-right: ${(props) =>
    props.align === 'center' || props.align === 'left' ? 'auto' : 0};

  ${(props) => (props.size === 'full' ? 'width: 100%;' : null)}
`;

const getPrimarySize = (size: ButtonSize) => {
  switch (size) {
    case ButtonSize.extraSmall:
      return ButtonSize.extraSmall;
    case ButtonSize.small:
      return ButtonSize.medium;
    case ButtonSize.medium:
      return ButtonSize.medium;
    case ButtonSize.large:
      return ButtonSize.large;
    case ButtonSize.full:
      return ButtonSize.full;
    default:
      return ButtonSize.large;
  }
};

export const PrimaryButton = styled.button<BaseButtonProps>`
  ${baseButtonCss}

  background: ${(props) => props.theme.colorButtonBackgroundPrimary};
  color: ${(props) => props.theme.colorButtonTextPrimary};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) =>
      props.theme.fontSizes.desktop.button[getPrimarySize(props.size)]};
    line-height: 1.22;

    padding: ${(props) =>
      props.theme.buttons.padding.desktop[getPrimarySize(props.size)]};
  }
`;

const getSecondarySize = (size: ButtonSize) => {
  switch (size) {
    case ButtonSize.extraSmall:
      return ButtonSize.extraSmall;
    case ButtonSize.small:
      return ButtonSize.small;
    case ButtonSize.medium:
      return ButtonSize.medium;
    case ButtonSize.large:
      return ButtonSize.medium;
    case ButtonSize.full:
      return ButtonSize.full;
    default:
      return ButtonSize.medium;
  }
};

export const SecondaryButton = styled.button<BaseButtonProps>`
  ${baseButtonCss}

  background-color: ${(props) => props.theme.colorButtonBackgroundSecondary};
  color: ${(props) => props.theme.colorButtonTextSecondary};
  box-shadow: inset 0px 0px 0px 2px ${(props) => props.theme.colorButtonBorderSecondary};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) =>
      props.theme.fontSizes.desktop.button[getSecondarySize(props.size)]};
    line-height: 1.22;

    padding: ${(props) =>
      props.theme.buttons.padding.desktop[getSecondarySize(props.size)]};
  }

  :hover {
    background-color: ${(props) => props.theme.colorButtonBackgroundSecondaryHover};
    color: ${(props) => props.theme.colorButtonTextSecondaryHover};
    box-shadow: inset 0px 0px 0px 2px
      ${(props) => props.theme.colorButtonBorderSecondaryHover};
  }

  ${StyledExpandableFactBoxContent} &, ${StyledFactBoxContent} & {
    color: ${(props) => props.theme.colorButtonBackgroundSecondary};

    :hover {
      background-color: ${(props) => props.theme.colorButtonBackgroundPrimary};
      color: ${(props) => props.theme.colorButtonTextPrimary};
    }
  }
`;

interface LinkButtonProps {
  align: ButtonAlign;
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
}

export const LinkButton = styled.button<LinkButtonProps>`
  ${fontHeadingMedium}

  font-size: ${(props) => props.theme.fontSizes.mobile.button.link};
  line-height: 1.25;
  white-space: nowrap;

  display: block;

  border: none;
  border-radius: ${(props) => props.theme.buttons.borderRadius};

  cursor: pointer;

  padding: 8px 32px;

  margin-top: ${(props) => props.theme.spacing[props.marginTop]}px;
  margin-bottom: ${(props) => props.theme.spacing[props.marginBottom]}px;

  margin-left: ${(props) =>
    props.align === 'center' || props.align === 'right' ? 'auto' : 0};
  margin-right: ${(props) =>
    props.align === 'center' || props.align === 'left' ? 'auto' : 0};

  background-color: ${(props) => props.theme.colorButtonBackgroundLink};
  color: ${(props) => props.theme.colorButtonTextLink};

  filter: ${(props) =>
    `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowLink, {
      opacity: 10,
    })} )`};
  transition: all 0.2s;

  :hover {
    filter: ${(props) =>
      `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowLink, {
        opacity: 15,
      })} )`};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.button.link};
    line-height: 1.21;
    padding: ${(props) => props.theme.buttons.padding.desktop.link};
  }

  ${StyledExpandableFactBoxContent} &, ${StyledFactBoxContent} & {
    box-shadow: inset 0px 0px 0px 2px ${(props) => props.theme.colorButtonTextLink};

    filter: ${(props) =>
      `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowLink, {
        opacity: 15,
      })} )`};

    :hover {
      filter: ${(props) =>
        `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowLink, {
          opacity: 25,
        })} )`};
    }
  }
`;

export const SocialButton = styled(LinkButton)<LinkButtonProps>`
  background-color: ${(props) => props.theme.colorButtonBackgroundSocial};
  color: ${(props) => props.theme.colorButtonTextSocial};

  filter: ${(props) =>
    `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowLink, {
      opacity: 10,
    })} )`};

  :hover {
    filter: ${(props) =>
      `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowLink, {
        opacity: 15,
      })} )`};
  }

  ${StyledExpandableFactBoxContent} &, ${StyledFactBoxContent} & {
    box-shadow: inset 0px 0px 0px 2px ${(props) => props.theme.colorButtonTextSocial};

    filter: ${(props) =>
      `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowLink, {
        opacity: 15,
      })} )`};

    :hover {
      filter: ${(props) =>
        `drop-shadow(4px 4px 4px ${hexToRgb(props.theme.colorButtonShadowSocial, {
          opacity: 25,
        })} )`};
    }
  }
`;

export const SocialButtonIcon = styled.div`
  display: inline-block;
  vertical-align: text-top;
  width: 19px;
  height: 19px;
  margin-right: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: ${getPixelClamp(22)};
    height: ${getPixelClamp(22)};
    margin-right: ${getPixelClamp(16)};
  }
`;

export const ButtonGroupContainer = styled.div<{ align: ButtonGroupAlignment }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.align};
  --gap: 16px;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));

  & > * {
    margin: var(--gap) 0 0 var(--gap);
  }
`;
