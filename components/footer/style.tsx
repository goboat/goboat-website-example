import { Link } from '../../sub-components/Text';
import styled from 'styled-components';

import { fontBodyRegular, fontBodySemiBold } from '../../styles/fonts';

export const Container = styled.footer`
  background-color: ${(props) => props.theme.colorFooterBackground};
  padding: ${(props) => props.theme.spacing.mediumXX}px
    ${(props) => props.theme.spacing.small}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    padding: 8.33vw 12.5vw ${(props) => props.theme.spacing.mediumXX}px 12.5vw;
  }

  @media print {
    display: none;
  }
`;

export const TopLayer = styled.div`
  ${fontBodyRegular}

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  gap: ${(props) => props.theme.spacing.xlarge}px;
  padding: ${(props) => props.theme.spacing.xxlarge}px 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    justify-content: center;
  }
`;

export const FooterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  height: fit-content;
  color: ${(props) => props.theme.colorTextPrimary};
`;

export const StyledFooterLink = styled(Link)`
  color: ${(props) => props.theme.colorFooterLink};

  ${fontBodyRegular}
  font-size: ${(props) => props.theme.fontSizes.mobile.text};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};
  }
`;

export const GroupTitle = styled.span`
  color: ${(props) => props.theme.colorFooterText};

  ${fontBodySemiBold}
  font-size: ${(props) => props.theme.fontSizes.mobile.text};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};
  }
`;

export const BottomWrapper = styled.div`
  color: ${(props) => props.theme.colorFooterText};
  display: grid;
  grid-template-columns: auto;
  grid-auto-rows: auto;
  align-items: baseline;
  grid-gap: 20px;

  a {
    grid-column: 2;
    grid-row: 1;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-gap: 0;
    justify-content: space-between;
    a {
      grid-column: 4;
    }
  }
`;

export const SocialsList = styled.ul`
  grid-column: 1;
  grid-row: 1;
  padding: 0;
  list-style: none;
  display: flex;
  margin: 0;
  align-self: center;

  > li:not(:last-child) {
    margin-right: 12px;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    align-self: end;
  }
`;

export const Copyright = styled.p`
  ${fontBodyRegular}
  font-size: ${(props) => props.theme.fontSizes.mobile.smallText};

  grid-column: 1/3;
  margin: 0;
  justify-self: center;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};

    grid-column: 2;
    grid-row: 1;
  }
`;

export const Cookies = styled.button`
  ${fontBodyRegular}
  font-size: ${(props) => props.theme.fontSizes.mobile.smallText};

  width: fit-content;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  grid-column: 1/3;
  justify-self: center;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};

    grid-column: 3;
    grid-row: 1;
  }
`;
