import useBreakpoint from '../../hooks/use-breakpoint';
import {
  StyledPricingTable,
  StyledPricingTableCell,
  StyledPricingTableFirstColumn,
  StyledPricingTableHeader,
  StyledPricingTableCellContent,
  StyledPricingTableRow,
} from './style';

type Price = {
  price: string;
  duration: string;
};

type PricingTableProps = {
  prices: Price[];
  currency: string;
  perPerson: string;
  perBoat: string;
};

const PricingTable = (props: PricingTableProps) => {
  const { prices, currency, perPerson, perBoat } = props;

  const { isMobile } = useBreakpoint();

  if (!prices.length) {
    return <div>No prices entered in pricing table block settings</div>;
  }

  if (!isMobile) {
    return (
      <StyledPricingTable columns={prices.length + 1}>
        <StyledPricingTableHeader>{/* placeholder */}</StyledPricingTableHeader>
        {props.prices.map((price: Price) => {
          return (
            <StyledPricingTableHeader key={`${price.price}-${price.duration}`}>
              <StyledPricingTableCellContent>
                {price.duration}
              </StyledPricingTableCellContent>
            </StyledPricingTableHeader>
          );
        })}
        <StyledPricingTableFirstColumn>{perPerson}</StyledPricingTableFirstColumn>
        {props.prices.map((price: Price) => {
          return (
            <StyledPricingTableCell key={`${price.price}-${price.duration}`}>
              <StyledPricingTableCellContent>
                {Math.round(parseInt(price.price) / 8)} {currency}
              </StyledPricingTableCellContent>
            </StyledPricingTableCell>
          );
        })}
        <StyledPricingTableFirstColumn>{perBoat}</StyledPricingTableFirstColumn>
        {props.prices.map((price: Price) => {
          return (
            <StyledPricingTableCell key={`${price.price}-${price.duration}`}>
              <StyledPricingTableCellContent>
                {parseInt(price.price)} {currency}
              </StyledPricingTableCellContent>
            </StyledPricingTableCell>
          );
        })}
      </StyledPricingTable>
    );
  }

  return (
    <StyledPricingTable columns={1}>
      <StyledPricingTableRow columns={3}>
        <StyledPricingTableHeader>{/* placeholder */}</StyledPricingTableHeader>
        <StyledPricingTableHeader>{perPerson}</StyledPricingTableHeader>
        <StyledPricingTableHeader>{perBoat}</StyledPricingTableHeader>
      </StyledPricingTableRow>
      {props.prices.map((price) => (
        <StyledPricingTableRow columns={3} key={`${price.price}-${price.duration}`}>
          <StyledPricingTableFirstColumn>
            <StyledPricingTableCellContent>
              {price.duration}
            </StyledPricingTableCellContent>
          </StyledPricingTableFirstColumn>
          <StyledPricingTableCell>
            <StyledPricingTableCellContent>
              {Math.round(parseInt(price.price) / 8)} {currency}
            </StyledPricingTableCellContent>
          </StyledPricingTableCell>
          <StyledPricingTableCell>
            <StyledPricingTableCellContent>
              {parseInt(price.price)} {currency}
            </StyledPricingTableCellContent>
          </StyledPricingTableCell>
        </StyledPricingTableRow>
      ))}
    </StyledPricingTable>
  );
};

export default PricingTable;
