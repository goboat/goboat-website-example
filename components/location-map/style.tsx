import styled from 'styled-components';
import { getPixelClamp } from '../../lib/utils';

import { Heading2, Heading3 } from '../../sub-components/Text';
import Image from '../image/image';
import Column from '../section/column';

interface GridBreakPoint {
  outerGridBreakPoint: number;
}

interface MapImageContainerProps {
  outerGridBreakPoint: number;
  isSelected: boolean;
}

interface MapImageProps {
  mapLinkHover: boolean;
}

export const MapLayout = styled(Column)`
  grid-column: 1/-1;
  display: inherit;
  grid-template-columns: inherit;
  grid-gap: inherit;
  margin: 128px 0;
`;

export const TopRow = styled.div`
  grid-column: 1/-1;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: flex;
  }
`;

export const TopRowMobile = styled.div`
  grid-column: 1/-1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: none;
  }
`;

export const MiddleRow = styled.div`
  grid-column: 1/-1;
  grid-template-columns: inherit;
  grid-gap: inherit;
  display: none;
  height: 336px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: inherit;
    height: auto;
  }
`;

export const MiddleRowMobile = styled.div`
  grid-column: 1/-1;
  display: inherit;
  grid-template-columns: inherit;
  grid-gap: inherit;
  height: 336px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: none;
  }
`;

export const EmblaViewport = styled.div<GridBreakPoint>`
  position: relative;
  grid-column: 1/-1;
  grid-row: 1;
  overflow: hidden;

  @media (min-width: ${(props) => props.outerGridBreakPoint}px) {
    grid-column: 2/-2;
  }
`;

export const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

export const EmblaSlide = styled.div`
  position: relative;
  min-width: 100%;
`;

export const EmblaSlideInner = styled.div`
  position: relative;
  overflow: hidden;
  height: 366px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 33.5vw;
  }
`;

export const EmblaSlideInnerMobile = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const EmblaSlideInnerMobileImages = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  height: 366px;
`;

export const MapImageContainer = styled.div<MapImageContainerProps>`
  grid-column: 7/-1;
  grid-row: 1;
  position: relative;
  top: ${getPixelClamp(82)};
  margin: 0;
  overflow: hidden;
  opacity: ${(props) => (props.isSelected ? 1 : 0)};
  pointer-events: ${(props) => (props.isSelected ? 'auto' : 'none')};
  transition: all 1s;
  height: 366px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 36vw;
  }

  @media (min-width: ${(props) => props.outerGridBreakPoint}px) {
    grid-column: 9/-1;
  }
`;

export const MapImage = styled(Image)<MapImageProps>`
  transition: all 0.3s ease-in-out;
  transform: ${(props) => (props.mapLinkHover ? 'scale(1.1)' : 'none')};

  position: relative;
  height: 100%;
`;

export const MapImageMobile = styled(Image)`
  position: relative;
`;

export const LocationName = styled(Heading2)`
  position: absolute;
  top: 32px;
  left: 32px;
  margin: 0;
  color: ${(props) => props.theme.colorTextSecondary};
`;

export const LocationNameMobile = styled(Heading3)`
  margin: 0;
  margin-bottom: 22px;
`;

export const BottomRow = styled.div<GridBreakPoint>`
  grid-column: 1/-1;
  display: flex;
  flex-direction: column-reverse;
  margin-top: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: inherit;
    grid-template-columns: inherit;
    grid-gap: inherit;
    margin-top: ${getPixelClamp(64)};
    min-height: ${getPixelClamp(140)};
  }
`;

export const Paragraph = styled.div<GridBreakPoint>`
  grid-column: 1/7;

  @media (min-width: ${(props) => props.outerGridBreakPoint}px) {
    grid-column: 1/8;
  }
`;

export const MapLink = styled.div`
  grid-column: 8/-1;
  display: flex;
  align-items: end;
  justify-content: end;
  margin-bottom: 32px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0;
  }
`;

export const NavigationArrowsMobile = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
`;

export const LinkArrow = styled.div<{ mapLinkHover: boolean }>`
  display: inline-block;
  vertical-align: middle;
  width: 7.5px;
  height: 14px;
  margin-left: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 9px;
    height: 16px;
    margin-left: 16px;
    position: relative;
    right: ${(props) => (props.mapLinkHover ? -5 : 0)}px;
    transition: all 0.3s;
  }
`;
