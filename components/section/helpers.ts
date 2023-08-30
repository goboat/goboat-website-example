import { css, DefaultTheme } from 'styled-components';
import {
  GridOptions,
  GridOptionValue,
  SectionBackgroundType,
  SectionBackgroundValue,
  SectionTextColor,
} from './types';
import { StyledSectionProps } from './style';
import { TextColor } from '../../sub-components/Text';

const columnStarts = {
  [GridOptionValue.normal]: 3,
  [GridOptionValue.extended]: 2,
  [GridOptionValue.full]: 1,
};

const columnEnds = {
  [GridOptionValue.normal]: -3,
  [GridOptionValue.extended]: -2,
  [GridOptionValue.full]: -1,
};

interface LayoutProps {
  gridOptions: GridOptions;
  theme: DefaultTheme;
}

// Content columns for desktop layout without extended grid
export const getDesktopLayout = (props: LayoutProps) => {
  const { theme, gridOptions } = props;

  const columnMaxWidth =
    (theme.grid.innerWidth - (theme.grid.columnCount - 1) * theme.grid.gap) /
    theme.grid.columnCount;

  const columns = [`repeat(${theme.grid.columnCount}, minmax(0px, ${columnMaxWidth}px))`];

  if (gridOptions.left === GridOptionValue.full) {
    columns.unshift(`minmax(${theme.grid.outerMargin - theme.grid.gap}px, 1fr)`);
  }

  if (gridOptions.right === GridOptionValue.full) {
    columns.push(`minmax(${theme.grid.outerMargin - theme.grid.gap}px, 1fr)`);
  }

  return css`
    grid-template-columns: ${columns.join(' ')};
    column-gap: ${theme.grid.gap}px;
  `;
};

// Content columns for desktop layout w/ extended grid
export const getExtendedGridLayout = (props: LayoutProps) => {
  const { theme, gridOptions } = props;

  // get column width by calculating (total width of grid - total width of gaps) / no of columns
  const columnWidth =
    (theme.grid.innerWidth - (theme.grid.columnCount - 1) * theme.grid.gap) /
    theme.grid.columnCount;

  const columns = [`repeat(${theme.grid.columnCount}, ${columnWidth}px)`];

  // Left side: for both full width and extended, add the 'extended grid column'
  if (gridOptions.left !== GridOptionValue.normal) {
    columns.unshift(
      `minmax(${theme.grid.extendedColumnMinWidth - theme.grid.gap}px, ${
        theme.grid.extendedColumnMaxWidth - theme.grid.gap
      }px)`
    );
  }

  // Left side: for full width, add the 'full width column'
  if (gridOptions.left === GridOptionValue.full) {
    columns.unshift(`minmax(${theme.grid.outerMargin - theme.grid.gap}px, 1fr)`);
  }

  // Right side: for both full width and extended, add the 'extended grid column'
  if (gridOptions.right !== GridOptionValue.normal) {
    columns.push(
      `minmax(${theme.grid.extendedColumnMinWidth - theme.grid.gap}px, ${
        theme.grid.extendedColumnMaxWidth - theme.grid.gap
      }px)`
    );
  }

  // Right side: for full width, add the 'full width column'
  if (gridOptions.right === GridOptionValue.full) {
    columns.push(`minmax(${theme.grid.outerMargin - theme.grid.gap}px, 1fr)`);
  }

  return css`
    grid-column: ${columnStarts[gridOptions.left]} / ${columnEnds[gridOptions.right]};
    grid-template-columns: ${columns.join(' ')};
  `;
};

interface GetSectionTextColorProps {
  backgroundType?: SectionBackgroundType;
  backgroundValue?: SectionBackgroundValue;
  textColor?: SectionTextColor;
}

export const getSectionTextColor = (
  props: GetSectionTextColorProps
): SectionTextColor => {
  const { backgroundType, backgroundValue, textColor } = props;

  if (textColor) return textColor;

  if (backgroundType === 'color' && backgroundValue === 'dark') return 'light';

  return 'dark';
};
