import styled from 'styled-components';

import { Heading1, InspirationalMessage, Text } from '../../sub-components/Text';

export const Section = styled.section`
  padding: 0 ${(props) => props.theme.spacing.small}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: 0;
    height: calc(100vh - 74px);
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
  }
`;

export const ImageLeft = styled.div`
  position: relative;
  display: none;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: inherit;
    object-fit: cover;
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const ImageRight = styled.div`
  position: relative;
  width: 100%;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 2;
    grid-row: 2;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
  }
`;

export const Heading = styled(Heading1)`
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 1;
    grid-row: 2;
    display: flex;
    align-items: flex-end;
    padding: 0 ${(props) => props.theme.spacing.xlarge}px
      ${(props) => props.theme.spacing.xlarge}px
      ${(props) => props.theme.spacing.xlarge}px;
  }
`;

export const Paragraph = styled(Text)`
  color: ${(props) => props.theme.colorTextSecondary};
  white-space: pre-line;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props.theme.spacing.xlarge}px;

    color: ${(props) => props.theme.colorTextPrimary};
  }
`;

export const Inspirational = styled(InspirationalMessage)`
  color: ${(props) => props.theme.colorTextSecondary};
  white-space: pre-line;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props.theme.spacing.xlarge}px;

    color: ${(props) => props.theme.colorTextPrimary};
  }
`;
