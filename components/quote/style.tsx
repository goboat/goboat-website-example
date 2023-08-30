import styled from 'styled-components';
import { fontBodyRegular, fontHeadingLight } from '../../styles/fonts';

export const StyledQuoteContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  fill: ${(props) => props.color};
  padding-top: 32px;
  padding-bottom: 48px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding-top: 64px;
    padding-bottom: 96px;
  }
`;

export const StyledQuotationMark = styled.div`
  margin-left: 0;
  margin-right: auto;
  height: 40px;
  width: 50px;

  svg {
    height: 100%;
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-left: calc(100vw / 7);
    margin-right: auto;
    height: 70px;
    width: 90px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktopLarge}px) {
    margin-left: 243px;
  }
`;

export const StyledQuote = styled.p<{ author: string }>`
  ${fontHeadingLight}

  font-style: italic;
  color: ${(props) => props.theme.colorTextSecondary};
  text-align: center;
  font-size: 20px;
  margin-bottom: ${(props) => (props.author ? '24px' : '96px')};
  margin-left: 0;
  margin-right: 0;
  margin-top: 24px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.inspirational};
    margin-bottom: ${(props) => (props.author ? '24px' : '0px')};
    margin-top: 40px;
  }
`;

export const StyledAuthor = styled.div`
  ${fontBodyRegular}

  color: ${(props) => props.theme.colorTextSecondary};
  text-align: right;
  margin: 0 0 0 auto;
  font-size: 12px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};
    margin-left: auto;
    margin-right: calc(100vw / 7);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktopLarge}px) {
    margin-right: 243px;
  }
`;
