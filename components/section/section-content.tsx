import React from 'react';
import { ColumnProps } from './column';
import { GridOptionValue, RenderedSectionProps } from './types';

const columnsMap: Record<string, number> = {
  '1/1': 12,
  '1/2': 6,
  '1/3': 4,
  '1/4': 3,
  '1/6': 2,
  '2/3': 8,
  '2/4': 6,
  '3/4': 9,
  '1/12': 1,
  '10/12': 10,
  '5/12': 5,
  '6/12': 6,
  '2/12': 2,
};

const getSpan = (width: string | number) => {
  let span = 12;
  if (typeof width === 'string' && columnsMap[width]) {
    span = columnsMap[width];
  } else if (typeof width === 'number') {
    span = width;
  }

  return span;
};

export type SectionContentProps = RenderedSectionProps & {
  subgrid: boolean;
};

const SectionContent = (props: SectionContentProps) => {
  const {
    gridOptions = {
      left: GridOptionValue.normal,
      right: GridOptionValue.normal,
    },
    subgrid,
  } = props;

  // start at the first grid column
  let columnPointer = 1;
  // keep a 2nd pointer for different values in extended grid media query
  let columnPointerExtended = 1;

  if (Array.isArray(props.children) && props.children.length !== props.template.length) {
    return <div>Section has invalid number of children</div>;
  }

  const children = React.Children.map(props.children, (child, i: number) => {
    let span = getSpan(props.template[i].width);
    let spanExtended = span;

    // If its the First column, and grid is full on left side, increase regular span by 1, and 2 if extended grid is enabled
    if (i === 0 && gridOptions.left === GridOptionValue.full) {
      span++;
      spanExtended += 2;
    }

    // If its the First column, and grid is extended, increase span by 1 if extended grid is enabled
    if (i === 0 && gridOptions.left === GridOptionValue.extended) {
      spanExtended++;
    }

    const isLastColumn = i === props.children.length - 1;

    // If its the Last column, and grid is full on right side, increase regular span by 1, and 2 if extended grid is enabled
    if (isLastColumn && gridOptions.right === GridOptionValue.full) {
      span++;
      spanExtended += 2;
    }

    // If its the Last column, and grid is extended on right side, increase span by 1 if extended grid is enabled
    if (isLastColumn && gridOptions.right === GridOptionValue.extended) {
      spanExtended++;
    }

    const columnStart = columnPointer;
    const columnStartExtended = columnPointerExtended;

    columnPointer += span;
    columnPointerExtended += spanExtended;

    if (child) {
      const columnProps: Omit<ColumnProps, 'children' | 'visibility'> = {
        columnStart,
        columnStartExtended,
        columnSpan: span,
        columnSpanExtended: spanExtended,
        subgrid,
        gridOptions,
      };

      return React.cloneElement(child, columnProps);
    } else {
      return null;
    }
  });

  return <React.Fragment>{children}</React.Fragment>;
};

export default SectionContent;
