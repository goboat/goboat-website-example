import Image from 'next/image';
import NextLink from 'next/link';
import { ForwardedRef, forwardRef, useContext } from 'react';
import styled, { css } from 'styled-components';
import {
  StyledExpandableFactBoxContent,
  StyledFactBoxContent,
} from '../components/fact-box/style';
import {
  fontBodyRegular,
  fontHeadingMedium,
  fontHeadingRegular,
  fontHeadingSemiBold,
} from '../styles/fonts';
import { SpacingValue } from '../styles/Theme';
import SectionContext from '../components/section/context';

export enum TextColor {
  primary = 'colorTextPrimary',
  secondary = 'colorTextSecondary',
  white = 'white',
  dark = 'colorTextDark',
  light = 'colorTextLight',
}

const checkTextColor = (color: TextColor) => {
  return Object.values(TextColor).includes(color);
};

export type BaseTextProps = {
  align?: string;
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  color?: TextColor;
  bold?: boolean;
};

/**
 * Common CSS for all headings
 */
const baseHeadingCss = css<BaseTextProps>`
  line-height: 1.2;
  margin: 0;
  padding: 0;
  margin-top: ${(props) =>
    props.theme.spacing[props.marginTop || props.margin || 'medium']}px;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.marginBottom || props.margin || 'medium']}px;
  text-align: ${(props) => props.align};
  color: ${(props) =>
    props.color && checkTextColor(props.color)
      ? props.theme[props.color]
      : props.theme.colorTextPrimary};

  ${StyledExpandableFactBoxContent} &, ${StyledFactBoxContent} & {
    color: ${(props) => props.theme.colors.factBoxText};
  }
`;

export type StyledHeadingProps = BaseTextProps & {
  size?: number;
};

export type HeadingProps = BaseTextProps & {
  size?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties | undefined;
};

/**
 * Heading 1
 */
export const heading1Css = css<StyledHeadingProps>`
  ${baseHeadingCss}
  ${fontHeadingMedium}

  /* Mobile font size */
  font-size: ${(props) =>
    `calc(${props.theme.fontSizes.mobile.heading1} * ${props.size ? props.size : 1})`};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) =>
      `calc(${props.theme.fontSizes.desktop.heading1} * ${props.size ? props.size : 1})`};
  }
`;
export const StyledHeading1 = styled.h1<StyledHeadingProps>`
  ${heading1Css}
`;

export const Heading1 = (props: HeadingProps) => {
  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <StyledHeading1 {...props} color={textColor}>
      {props.children}
    </StyledHeading1>
  );
};

/**
 * Heading 2
 */
export const heading2Css = css<StyledHeadingProps>`
  ${baseHeadingCss}
  ${fontHeadingSemiBold}

  /* Mobile font size */
  font-size: ${(props) =>
    `calc(${props.theme.fontSizes.mobile.heading2} * ${props.size ? props.size : 1})`};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) =>
      `calc(${props.theme.fontSizes.desktop.heading2} * ${props.size ? props.size : 1})`};
  }
`;
export const StyledHeading2 = styled.h2<StyledHeadingProps>`
  ${heading2Css}
`;

export const Heading2 = (props: HeadingProps) => {
  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <StyledHeading2 {...props} color={textColor}>
      {props.children}
    </StyledHeading2>
  );
};

/**
 * Heading 3
 */
export const heading3Css = css<StyledHeadingProps>`
  ${baseHeadingCss}
  ${fontHeadingSemiBold}

  /* Mobile font size */
  font-size: ${(props) =>
    `calc(${props.theme.fontSizes.mobile.heading3} * ${props.size ? props.size : 1})`};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) =>
      `calc(${props.theme.fontSizes.desktop.heading3} * ${props.size ? props.size : 1})`};
  }
`;
export const StyledHeading3 = styled.h3<StyledHeadingProps>`
  ${heading3Css}
`;

export const Heading3 = (props: HeadingProps) => {
  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <StyledHeading3 {...props} color={textColor}>
      {props.children}
    </StyledHeading3>
  );
};

/**
 * Inspirational message
 */
export type StyledInspirationalMessageProps = StyledHeadingProps;

export type InspirationalMessageProps = StyledInspirationalMessageProps & {
  children?: React.ReactNode;
};

export const StyledInspirationalMessage = styled.p<StyledInspirationalMessageProps>`
  ${fontHeadingRegular}

  color: ${(props) =>
    props.color && checkTextColor(props.color)
      ? props.theme[props.color]
      : props.theme.colorTextPrimary};

  margin: 0;
  padding: 0;

  line-height: 1.2;

  text-align: ${(props) => props.align};

  margin-top: ${(props) => props.theme.spacing[props.marginTop || 'none']}px;
  margin-bottom: ${(props) => props.theme.spacing[props.marginBottom || 'none']}px;

  /* Mobile font size */
  font-size: ${(props) => props.theme.fontSizes.mobile.inspirational};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.inspirational};
  }
`;

export const InspirationalMessage = (props: InspirationalMessageProps) => {
  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <StyledInspirationalMessage {...props} color={textColor}>
      {props.children}
    </StyledInspirationalMessage>
  );
};

/**
 * Common CSS for all paragraphs
 */

export const baseParagraphCss = css<BaseTextProps>`
  ${fontBodyRegular}

  font-weight: ${(props) => (props.bold ? 600 : 400)};

  margin: 0;
  padding: 0;

  color: ${(props) =>
    props.color && checkTextColor(props.color)
      ? props.theme[props.color]
      : props.theme.colorTextPrimary};

  margin-top: ${(props) =>
    props.theme.spacing[props.marginTop || props.margin || 'medium']}px;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.marginBottom || props.margin || 'medium']}px;

  text-align: ${(props) => props.align};

  ${StyledExpandableFactBoxContent} &, ${StyledFactBoxContent} & {
    color: ${(props) => props.theme.colors.factBoxText};
  }

  a {
    color: ${(props) =>
      props.color && checkTextColor(props.color)
        ? props.theme[props.color]
        : props.theme.colorTextPrimary};
    text-decoration: underline;
  }

  a:hover {
    color: ${(props) => props.theme.colorLinkHover};
  }
`;

/**
 * Regular Paragraph
 */
export const textCss = css<BaseTextProps>`
  ${baseParagraphCss}
  line-height: 1.3;

  /* Mobile font size */
  font-size: ${(props) => props.theme.fontSizes.mobile.text};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.text};
  }
`;
export const StyledText = styled.p`
  ${textCss}
`;

export type TextProps = BaseTextProps & {
  children?: React.ReactNode;
  dangerouslySetInnerHTML?: { __html: string } | undefined;
  style?: React.CSSProperties | undefined;
};

export const Text = (props: TextProps) => {
  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <StyledText {...props} color={textColor}>
      {props.children}
    </StyledText>
  );
};

/**
 * Small Paragraph
 */
export const smallTextCss = css<BaseTextProps>`
  ${baseParagraphCss}
  line-height: 1.4;

  /* Mobile font size */
  font-size: ${(props) => props.theme.fontSizes.mobile.smallText};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};
  }
`;
export const StyledSmallText = styled.p`
  ${smallTextCss}
`;

export const SmallText = (props: TextProps) => {
  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <StyledSmallText {...props} color={textColor}>
      {props.children}
    </StyledSmallText>
  );
};

type StyledLinkProps = BaseTextProps & {
  className?: string;
  target?: any;
};

/**
 * Anchor Link
 */
export const styledLinkCss = css<StyledLinkProps>`
  ${fontHeadingMedium}

  line-height: 1.3;

  margin: 0;
  padding: 0;

  color: ${(props) =>
    props.color && checkTextColor(props.color)
      ? props.theme[props.color]
      : props.theme.colorTextPrimary};

  margin-top: ${(props) => props.theme.spacing[props.marginTop || 'none']}px;
  margin-bottom: ${(props) => props.theme.spacing[props.marginBottom || 'none']}px;

  /* Mobile font size */
  font-size: ${(props) => props.theme.fontSizes.mobile.link};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.link};
  }
`;
export const StyledLink = styled.a<StyledLinkProps>`
  ${styledLinkCss}
`;

const LinkArrow = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 7.5px;
  height: 14px;
  margin-left: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 6px;
    height: 10.67px;
    margin-left: 10.67px;
    position: relative;
  }

  right: 0px;
  transition: all 0.2s;

  ${StyledLink}:hover && {
    right: -5px;
  }
`;

// TODO: Fix the type of props ↓ (Link should also accept mouse events etc.)
const LinkComponent = (
  props: { color?: TextColor; [key: string]: any },
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const { children, href, className, target, onClick, style, ...rest } = props;

  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <NextLink href={href} passHref>
      <StyledLink
        ref={ref}
        className={className}
        target={target}
        onClick={onClick}
        style={style}
        {...rest}
        color={textColor}
      >
        {children}
        {props.arrow && (
          <LinkArrow>
            <Image
              src="/c12.svg"
              layout="responsive"
              width="6px"
              height="10.67px"
              alt="Arrow right"
            />
          </LinkArrow>
        )}
      </StyledLink>
    </NextLink>
  );
};

export const Link = forwardRef(LinkComponent);

interface StyledListItemProps {
  color?: TextColor;
}

export type ListItemProps = StyledListItemProps & {
  children?: React.ReactNode;
  style?: React.CSSProperties | undefined;
};

export const listItemCss = css<StyledListItemProps>`
  ${fontBodyRegular}

  line-height: 1.3;

  margin: 0;
  padding: 0;

  color: ${(props) =>
    props.color && checkTextColor(props.color)
      ? props.theme[props.color]
      : props.theme.colorTextPrimary};

  /* Mobile font size */
  font-size: ${(props) => props.theme.fontSizes.mobile.text};

  /* Desktop font size */
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.text};
  }

  ${StyledExpandableFactBoxContent} &, ${StyledFactBoxContent} & {
    color: ${(props) => props.theme.colors.factBoxText};
  }

  a {
    color: ${(props) =>
      props.color && checkTextColor(props.color)
        ? props.theme[props.color]
        : props.theme.colorTextPrimary};
    text-decoration: underline;
  }

  a:hover {
    color: ${(props) => props.theme.colorLinkHover};
  }
`;
export const StyledListItem = styled.li`
  ${listItemCss}
`;

const ListItemComponent = (props: ListItemProps, ref: ForwardedRef<HTMLLIElement>) => {
  const sectionContext = useContext(SectionContext);

  const textColor =
    props.color && checkTextColor(props.color)
      ? props.color
      : sectionContext.textColor
      ? TextColor[sectionContext.textColor]
      : undefined;

  return (
    <StyledListItem {...props} color={textColor} ref={ref}>
      {props.children}
    </StyledListItem>
  );
};

export const ListItem = forwardRef(ListItemComponent);
