import styled from 'styled-components';

import { fontBodyRegular, fontBodySemiBold } from '../../styles/fonts';

type StyledPricingTableProps = {
  columns: number;
};

export const StyledPricingTable = styled.div<StyledPricingTableProps>`
  ${fontBodyRegular}

  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  font-size: ${(props) => props.theme.fontSizes.desktop.smallText};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.text};
  }
`;

export const StyledPricingTableRow = styled.div<StyledPricingTableProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
`;

export const StyledPricingTableCell = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xsmallx}px;
  border-bottom: 1px solid ${(props) => props.theme.colors.pricingTableBorderColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    ${fontBodySemiBold}

    background-color: ${(props) => props.theme.colors.pricingTableHoverColor};
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: ${(props) => props.theme.spacing.smallx}px;
  }
`;

export const StyledPricingTableFirstColumn = styled.div`
  padding: ${(props) => props.theme.spacing.small}px;
  padding-left: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.pricingTableBorderColor};
  text-align: left;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: ${(props) => props.theme.spacing.smallx}px;
    padding-left: 0;
  }
`;

export const StyledPricingTableHeader = styled.div`
  ${fontBodySemiBold}

  text-align: center;
  padding: ${(props) => `${props.theme.spacing.xsmallx}px`};
  border-bottom: 1px solid ${(props) => props.theme.colors.pricingTableBorderColor};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    ${fontBodyRegular}

    padding: ${(props) => props.theme.spacing.smallx}px;
  }
`;

export const StyledPricingTableCellContent = styled.div``;
