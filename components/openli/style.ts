import styled from 'styled-components';
import { fontBodySemiBold } from '../../styles/fonts';

import {
  heading1Css,
  heading2Css,
  heading3Css,
  smallTextCss,
  styledLinkCss,
} from '../../sub-components/Text';

export const StyledCookiePolicy = styled.div`
  p {
    ${smallTextCss}
  }

  h1 {
    ${heading1Css}
  }

  h2 {
    ${heading2Css}
  }

  h3 {
    ${heading3Css}
  }

  h4 {
    ${heading3Css}
  }

  a {
    ${styledLinkCss}

    /* Desktop font size */
    @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
      font-size: ${(props) => props.theme.fontSizes.desktop.smallText};
    }
  }

  table {
    table-layout: fixed;
  }

  tr {
    border-bottom: 1px solid ${(props) => props.theme.colors.dark};
  }

  th {
    ${smallTextCss}
    ${fontBodySemiBold}
    text-align: left;
  }

  th:nth-child(1) {
    width: 20%;
  }

  td {
    ${smallTextCss}
    text-align: left;
    padding: 0.5rem 0.5rem 0.5rem 0;
    word-break: break-word;
  }

  td:nth-child(1) {
    width: 20%;
  }
`;
