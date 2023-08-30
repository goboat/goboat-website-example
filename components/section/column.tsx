import React from 'react';
import { GridOptions } from './types';
import { GridColumn } from './style';
import { VisibilityOptions } from '../../lib/types';
import { SpacingValue } from '../../styles/Theme';

export interface ColumnProps {
  columnStart?: number;
  columnStartExtended?: number;
  columnSpan?: number;
  columnSpanExtended?: number;
  subgrid?: boolean;
  gridOptions?: GridOptions;
  visibility?: VisibilityOptions;
  children?: any;
  alignment?: 'left' | 'right' | 'center';
  style?: object;
  paddingTop?: SpacingValue;
  paddingBottom?: SpacingValue;
  contentPadding?: SpacingValue;
  verticalOffsetTop?: SpacingValue;
  verticalOffsetBottom?: SpacingValue;
}

// silence is golden
const Column = (props: ColumnProps) => {
  return <GridColumn {...props}>{props.children}</GridColumn>;
};

export default Column;
