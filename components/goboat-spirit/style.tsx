import styled from 'styled-components';

import { Heading2, InspirationalMessage } from '../../sub-components/Text';
import VideoPlayer from '../../sub-components/video-player';
import { CarouselMode, SlideProps } from './desktop-carousel-image';
/**
 * Desktop
 */

export const EmblaViewport = styled.div`
  overflow: hidden;
`;

export const DesktopWrapper = styled.div`
  grid-column: 1 / span 10;
  position: relative;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    grid-column: 1 / span 11;
  }
`;

export const EmblaContainer = styled.div`
  display: flex;
  transform: none !important;
  height: 72vh;
`;

export const StyledVideo = styled(VideoPlayer)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
/**
 * Mobile
 */

export const MobileEmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

export const MobileWrapper = styled.div`
  position: relative;
  height: 850px;
`;

export const MobileHeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: auto;
`;

export const MobileContentWrapper = styled.div<{ isSelected: boolean }>`
  margin: 0 ${(props) => props.theme.grid.mobile.outerMargin}px;
  position: absolute;
  width: calc(100% - ${(props) => 2 * props.theme.grid.mobile.outerMargin}px);
  opacity: ${(props) => (props.isSelected ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

export const NoWrapHeading = styled(Heading2)`
  white-space: nowrap;
  font-size: 26px;
`;

export const Grid = styled.div`
  grid-column: 1 / -1;
  display: inherit;
  grid-template-columns: inherit;
  column-gap: inherit;
`;

export const TopRow = styled.div`
  grid-column: 1 / -1;
  display: inherit;
  grid-template-columns: inherit;
  column-gap: inherit;
  height: 72vh;
`;

export const BottomRow = styled.div`
  grid-column: 1 / -1;
  display: inherit;
  grid-template-columns: inherit;
  column-gap: inherit;
  min-height: 28vh;
  height: max-content;
`;

export const TopColumn = styled.div`
  grid-column: 11 / span 4;
  height: 72vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 330px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    grid-column: 12 / span 5;
  }
`;

export const BottomColumn = styled.div`
  grid-column: 11 / span 4;
  height: 100%;
  margin-left: -${(props) => props.theme.grid.gap}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    grid-column: 12 / span 5;
  }
`;

export const MessageWrapper = styled.div`
  grid-column: 1 / span 10;
  min-height: 28vh;
  display: flex;
  align-items: end;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    grid-column: 1 / span 11;
  }
`;

export const StyledInspirationalMessage = styled(InspirationalMessage)`
  margin: 48px ${(props) => props.theme.grid.outerMargin}px 48px;
  user-select: none;
`;

export const EmblaSlide = styled.div<SlideProps>`
  position: ${(props) => (props.mode === CarouselMode.fade ? 'absolute' : 'relative')};
  min-width: ${(props) => props.width}%;
  padding-left: ${(props) => props.imageMargin}px;
  opacity: ${(props) =>
    props.isSelected ? '1' : props.mode === CarouselMode.fade ? '0' : '0.7'};
  transition: opacity ${(props) => props.transitionSpeed}s ease;
  z-index: 1;
  height: 100%;
  ${(props) =>
    props.mode === CarouselMode.fade
      ? `
  left: 0 !important;
  right: 0 !important;
  `
      : ''}
`;

export const EmblaSlideInner = styled.div`
  position: relative;
  overflow: hidden;
  height: 72vh;
`;
