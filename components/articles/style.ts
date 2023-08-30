import styled from 'styled-components';

import { Heading3, Text } from '../../sub-components/Text';
import Image from '../image/image';

export const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: ${(props) => props.theme.grid.gap}px;
  row-gap: 64px;
  margin-bottom: 128px;
`;

export const ArticleContainer = styled.article`
  grid-column: 1 / span 12;
  cursor: pointer;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    &:nth-of-type(9n + 1) {
      grid-column: 1 / span 8;
      &:nth-last-child(3) {
        grid-column: 1 / span 4;
      }
      &:last-of-type {
        grid-column: 1 / span 12;
      }
    }
    &:nth-of-type(9n + 2) {
      grid-column: 9 / span 4;
      &:nth-last-child(2) {
        grid-column: 5 / span 4;
      }
    }
    &:nth-of-type(9n + 3) {
      grid-column: 1 / span 6;
      &:last-child {
        grid-column: 9 / span 4;
      }
      &:nth-last-child(3) {
        grid-column: 1 / span 4;
      }
    }
    &:nth-of-type(9n + 4) {
      grid-column: 7 / span 6;
      &:nth-last-child(2) {
        grid-column: 5 / span 4;
      }
    }
    &:nth-of-type(9n + 5) {
      grid-column: 1 / span 4;
      &:last-child {
        grid-column: 9 / span 4;
      }
    }
    &:nth-of-type(9n + 6) {
      grid-column: 5 / span 8;
      &:nth-last-child(2) {
        grid-column: 5 / span 4;
      }
    }
    &:nth-of-type(9n + 7) {
      &:last-child {
        grid-column: 9 / span 4;
      }
      &:nth-last-child(2) {
        grid-column: 1 / span 8;
      }
      grid-column: 1 / span 4;
    }
    &:nth-of-type(9n + 8) {
      &:last-child {
        grid-column: 9 / span 4;
      }
      grid-column: 5 / span 4;
    }
    &:nth-of-type(9n + 9) {
      grid-column: 9 / span 4;
    }
  }
`;

export const ImageWrapper = styled.div`
  margin-bottom: 16px;
  height: 256px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 375px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    height: 464px;
  }
`;

export const ArticleImage = styled(Image)`
  margin: 0;
  height: 100%;
  position: relative;
`;

export const NoImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorButtonBackgroundSecondary};
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 1.5rem;
  padding: 16px;
  height: 256px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: 2rem;
    height: 375px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    height: 464px;
  }
`;

// https://css-tricks.com/line-clampin/
export const ListArticleDescription = styled(Text)`
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const LoadMoreButton = styled.button<{ disabled: boolean }>`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  margin-bottom: 98px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
`;

/**
 * List article heading is modified to have min height of 2 lines of text
 * to better preserve alignment of article summaries displayed below heading
 * 3 lines will still push the text down, but that is fine
 */
export const ListArticleHeading = styled(Heading3)`
  margin: 0 0 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0 0 16px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    /* if we modify line-height of headings we will have to account for that here */
    min-height: ${(props) =>
      `calc(2 * 1.2 * ${props.theme.fontSizes.desktop.heading3} * ${
        props.size ? props.size : 1
      })`};
  }
`;
