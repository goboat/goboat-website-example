import styled from 'styled-components';
import { fontBodyRegular, fontHeadingSemiBold } from '../../styles/fonts';

import { SmallText } from '../../sub-components/Text';
import Section from '../section/section';

export const NavigationBarContainer = styled(Section)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  margin: 0;
`;

export const NavigationBarWrapper = styled.div`
  grid-row: 1;
  background-color: ${(props) => props.theme.colorPageBackground};
  height: 44px;
  grid-column: 1 / -1;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    grid-column: 6 / -1;
    margin-left: -${(props) => props.theme.grid.gap}px;
  }
`;

export const NavigationBarWrapperMobile = styled.div`
  grid-row: 1;
  background-color: ${(props) => props.theme.colorPageBackground};
  grid-column: 1 / -1;
  padding: 15px 24px 15px 16px;
  display: flex;
  justify-content: space-between;
`;

export const LocationSelector = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 2 / 8;
    align-self: end;
  }

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    grid-column: 7 / 10;
  }

  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.extendedGrid}px) {
    grid-column: 7 / 11;
  }
`;

export const StyledBookLink = styled.span`
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-row: 1;
    grid-column: 8 / -2;
    align-self: end;
    display: flex;
    justify-content: flex-end;
  }

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    grid-column: 10 / -1;
    padding-right: 64px;
  }

  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.extendedGrid}px) {
    grid-column: 11 / -1;
  }
`;

export const OpenHours = styled(SmallText)`
  margin: 0;
  text-align: center;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: none;
  }
`;

export const LanguageSelect = styled.ul`
  ${fontHeadingSemiBold}

  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, max-content));
  gap: ${(props) => props.theme.spacing.medium}px;
  justify-self: end;
  min-width: calc(2 * 20px + ${(props) => props.theme.spacing.medium}px);
  max-width: 100%;
  height: fit-content;

  li {
    list-style: none;

    input {
      visibility: hidden;
      display: none;
    }

    label {
      cursor: pointer;
      color: ${(props) => props.theme.colorInactive};
      font-size: ${(props) => props.theme.fontSizes.desktop.smallText};
      font-weight: 600;
    }

    input {
      color: ${(props) => props.theme.colorInactive};
    }

    input:checked + label {
      color: ${(props) => props.theme.colorTextPrimary};
    }
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: none;
  }
`;
