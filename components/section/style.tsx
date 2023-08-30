import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';
import { VisibilityOptions } from '../../lib/types';
import { colors, spacing, SpacingValue } from '../../styles/Theme';
import { ColumnProps } from './column';
import { getDesktopLayout, getExtendedGridLayout } from './helpers';
import {
  GridOptions,
  GridOptionValue,
  SectionBackgroundType,
  SectionBackgroundValue,
} from './types';

/**
 * Outer wrapper for section that sets the width of the whole thing
 */
export type OuterWrapperProps = {
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
  paddingTop: SpacingValue;
  paddingBottom: SpacingValue;
  className?: string;
  visibility?: VisibilityOptions;
  extendBackground?: boolean;
};

// The grid is max 1760 px wide
// An image is then max 440 px wide and tall
// The max amount that the bg should extend up is 220px

// -- With extended columns - 1700px and up--
// grid width = {{screen width}} - 160px margin but max 1760px
// image height = {{grid width}} / 4
// extension = {{image height}} / 2 + {{section margin top}}

// -- With unused extended columns - from 1601px screen to 1699px --
// constant 180px extension

// -- Without extended columns - 1600px and down --
// grid width = {{screen width}} - 160px margin
// image height = {{grid width}} / 4
// extension = {{image height}} / 2 + {{section margin top}}

export const StyledSectionWrapper = styled.div<OuterWrapperProps>`
  position: relative;
  display: ${(props) => (props.visibility?.mobile === false ? 'none' : 'grid')};
  width: 100%;

  margin: ${(props) => spacing[props.marginTop]}px 0
    ${(props) => spacing[props.marginBottom]}px;
  padding: ${(props) => spacing[props.paddingTop]}px 0
    ${(props) => spacing[props.paddingBottom]}px;

  /* stick to 5 columns for easy placement */
  grid-template-columns: ${(props) =>
    `${props.theme.grid.mobile.outerMargin}px 0px minmax(0px, ${props.theme.grid.innerWidth}px) 0px ${props.theme.grid.mobile.outerMargin}px`};

  ${(props) =>
    props.extendBackground
      ? `margin-top: calc((-100vw - -32px) / 4 + -${spacing[props.marginTop]}px);`
      : null};
  ${(props) =>
    props.extendBackground
      ? `padding-top: calc((100vw - 32px) / 4 + ${spacing[props.marginTop]}px);`
      : null};

  /* Switch to desktop grid w/ max width for regular grid */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: ${(props) => (props.visibility?.desktop === false ? 'none' : 'grid')};
    grid-template-columns: ${(props) =>
      `${props.theme.grid.outerMargin}px 1fr minmax(0px, ${props.theme.grid.innerWidth}px) 1fr ${props.theme.grid.outerMargin}px`};

    ${(props) =>
      props.extendBackground
        ? `margin-top: max(calc((-100vw - -160px) / 8 + -${
            spacing[props.marginTop]
          }px), calc(-1760px / 8 + -32px));`
        : null};
    ${(props) =>
      props.extendBackground
        ? `padding-top: min(calc(1760px / 8 + 32px), calc((100vw - 160px) / 8 + ${
            spacing[props.marginTop]
          }px));`
        : null};
  }

  /* enable extended grid with min/max width, and allow margin columns to grow for full width grid */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    grid-template-columns: ${(props) =>
      `minmax(${props.theme.grid.outerMargin}px, 1fr)
      minmax(${props.theme.grid.extendedColumnMinWidth}px, ${props.theme.grid.extendedColumnMaxWidth}px)
      ${props.theme.grid.innerWidth}px
      minmax(${props.theme.grid.extendedColumnMinWidth}px, ${props.theme.grid.extendedColumnMaxWidth}px)
      minmax(${props.theme.grid.outerMargin}px, 1fr)`};
  }
`;

/**
 * Inner wrapper for section to place columns
 */
export type StyledSectionProps = {
  gridOptions: GridOptions;
  zIndex: number | 'auto';
};

const rightAlignmentCss = css`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const centerAlignmentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getAlignmentCss = (alignment?: string) => {
  if (alignment === 'center') return centerAlignmentCss;
  if (alignment === 'right') return rightAlignmentCss;
  return css``;
};

export const StyledSection = styled.div<StyledSectionProps>`
  display: grid;
  width: 100%;
  /* Mobile grid w/ 4 colums */
  grid-template-columns: repeat(4, 1fr);
  column-gap: ${(props) => props.theme.grid.mobile.gap}px;
  grid-column: ${(props) => (props.gridOptions.left === GridOptionValue.full ? 1 : 3)} /
    ${(props) => (props.gridOptions.right === GridOptionValue.full ? -1 : -3)};
  padding: 0 ${(props) => props.theme.grid.padding}px;
  z-index: ${(props) => props.zIndex};

  /* Desktop grid up to the point where the extended grid becomes active */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    ${getDesktopLayout}
  }
  /* Desktop layout w/ extended grid */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    ${getExtendedGridLayout}
  }
`;

/**
 * The actual column
 */
export const GridColumn = styled.div<ColumnProps>`
  /* Placement on mobile: every column is full width */
  grid-column: 1 / -1;

  ${(props) => props.subgrid && 'display: inherit;'}
  ${(props) => props.subgrid && 'grid-template-columns: inherit;'}
  ${(props) => props.subgrid && 'grid-gap: inherit;'}
  ${(props) => getAlignmentCss(props.alignment)}

  ${(props) => props.paddingTop && `padding-top: ${spacing[props.paddingTop]}px;`}
  ${(props) =>
    props.paddingBottom && `padding-bottom: ${spacing[props.paddingBottom]}px;`}
  ${(props) =>
    props.contentPadding && `padding-left: ${spacing[props.contentPadding]}px;`}
  ${(props) =>
    props.contentPadding && `padding-right: ${spacing[props.contentPadding]}px;`}

  ${(props) =>
    props.verticalOffsetBottom &&
    `margin-bottom: ${spacing[props.verticalOffsetBottom]}px;`}
  ${(props) =>
    props.verticalOffsetTop && `margin-top: ${spacing[props.verticalOffsetTop]}px;`}

  ${(props) => (props.visibility?.mobile === false ? 'display: none;' : null)}

  /* Placement on regular grid w/o extended grid */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: ${(props) => `${props.columnStart} / span ${props.columnSpan}`};
    display: ${(props) =>
      props.visibility?.desktop !== false
        ? props.subgrid
          ? 'inherit'
          : /center|right/.test(String(props.alignment))
          ? 'flex'
          : 'block'
        : 'none'};
  }

  /* Placement on regular grid with extended grid active */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    grid-column: ${(props) =>
      `${props.columnStartExtended} / span ${props.columnSpanExtended}`};
  }
`;

/**
 *  Helper function to generate background css for sections
 * @param backgroundType "transparent", "color", or "image"
 * @param backgroundValue if backgroundType is color then "light" or "dark",
 * if backgroundType is image then "{ url: string }"
 * @returns {string} css string
 */
export function getBackgroundStyle(
  backgroundType?: SectionBackgroundType,
  backgroundValue?: SectionBackgroundValue,
  theme?: DefaultTheme
): FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<any>> {
  if (!backgroundType || backgroundType === 'transparent') {
    return css``;
  } else if (backgroundType === 'color' && typeof backgroundValue === 'string') {
    return css`
      background-color: ${theme?.colors[backgroundValue]};
    `;
  } else if (
    backgroundType === 'image' &&
    typeof backgroundValue === 'object' &&
    backgroundValue.url
  ) {
    return css`
      background-image: url(${backgroundValue.url});
      background-position: center;
      background-size: cover;
    `;
  }

  return css``;
}
