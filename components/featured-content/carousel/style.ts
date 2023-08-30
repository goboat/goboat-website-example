import styled from 'styled-components';

import { Heading2, Heading3, Text } from '../../../sub-components/Text';
import Section from '../../section/section';

export const StyledHeading = styled(Heading2)`
  margin-top: 32px;
  margin-bottom: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: 8.33vw;
    margin-bottom: 3.33vw;
  }
`;

export const StyledParagraph = styled(Text)`
  margin: 0 0 32px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0;
  }
`;

export const EmblaContainer = styled.div<{ imageMargin: number }>`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  margin-left: -${(props) => props.imageMargin}px;
`;

export const EmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const FirstRow = styled.div<{ margin: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${(props) => props.margin}px 22px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0 ${(props) => props.margin}px 32px;
  }
`;

export const ArrowIcon = styled.div`
  cursor: pointer;
  margin: 0;
  margin-left: 20px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 2.916vw;
    height: 2.916vw;
    margin-left: 40px;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
`;

export const NoImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colorButtonBackgroundSecondary};
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 1.5rem;
  padding: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: 2rem;
  }
`;

export const NonSelecatbleHeading = styled(Heading3)`
  user-select: none;
`;

export const NonSelectableParagraph = styled(Text)`
  user-select: none;
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr minmax(200px, 40%);
    margin: 0;
  }
`;

export const SlideDetailsGrid = styled.div`
  display: grid;
`;

export const SlideDetailsContainer = styled.div<{ isSelected: boolean }>`
  grid-area: 1/-1;
  opacity: ${(props) => (props.isSelected ? 1 : 0)};
  z-index: ${(props) => (props.isSelected ? 10 : 0)};
  transition: all 0.5s;
`;

export const SlideHeading = styled(Heading3)`
  margin: 0 0 16px;
`;

export const SlideTeaser = styled(Text)`
  margin: 0;
  color: ${(props) => props.theme.colorTextSecondary};
`;

export const ArrowContainer = styled.div<{ platform: string }>`
  justify-content: end;
  display: ${(props) => (props.platform === 'desktop' ? 'none' : 'flex')};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: ${(props) => (props.platform === 'desktop' ? 'flex' : 'none')};
  }
`;

export const NavigationDot = styled.div<{ isSelected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colorTextPrimary};
  opacity: ${(props) => (props.isSelected ? 1 : 0.3)};

  &:not(:last-child) {
    margin-right: 6px;
  }
`;

export const NavigationDotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 16px 0 35px;
  }
`;

interface EmblaSlideProps {
  imageMargin: number;
  isSelected: boolean;
}

export const EmblaSlide = styled.div<EmblaSlideProps>`
  position: relative;
  min-width: 100%;
  padding-left: ${(props) => props.imageMargin}px;
  opacity: ${(props) => (props.isSelected ? '1' : '0.7')};
  transition: opacity 0.5s ease;
`;

export const EmblaSlideInner = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const FeaturedCarouselSection = styled(Section)`
  margin-top: 50px;
  background-color: ${(props) => props.theme.colorLight};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: 128px;
    background-color: transparent;
  }
`;
