import styled, { keyframes } from 'styled-components';

import { Heading2, Heading3, Text } from '../../../sub-components/Text';
import Image from '../../image/image';

export const UnorderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 64px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 3.33vw;
  }
`;

export const FeaturedListDesktopHeading = styled(Heading2)`
  margin-top: 160px;
  margin-bottom: 32px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: 8.33vw;
    margin-bottom: 1.67vw;
  }
`;

export const FeaturedListDesktopText = styled(Text)`
  margin-bottom: 64px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 3.33vw;
  }
`;

const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

export const FeaturedListDesktopImagePast = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const FeaturedListDesktopImageCurrent = styled(FeaturedListDesktopImagePast)`
  z-index: 10;
  animation: 0.7s ${fadeIn};
`;

export const FeaturedListDesktopImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/10;
  position: relative;
  cursor: pointer;
`;

export const FeaturedListMobileEntryContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
`;

export const FeaturedListMobileEntryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: linear-gradient(
    rgba(51, 50, 51, 0.5) 15%,
    rgba(51, 50, 51, 0.3) 35%,
    rgba(51, 50, 51, 0) 100%
  );
`;

export const FeaturedListMobileEntryTitle = styled(Heading3)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  color: ${(props) => props.theme.colorLight};
  margin: 8px 10px;
`;

export const FeaturedListMobileEntryImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;
