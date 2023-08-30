import styled from 'styled-components';

import { Heading3, Text } from '../../sub-components/Text';
import Image from '../image/image';

export const RelatedContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-top: 32px;
  margin-bottom: 104px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: 64px;
    margin-bottom: 128px;
  }
`;

export const Card = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  flex: 0 0 75vw;
  margin-right: 32px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    flex: 0 0 28.5vw;
    margin-right: 5vw;
  }
`;

export const RelatedContentImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  height: 280px;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 24.1vw;
    margin-bottom: 16px;
  }
`;

export const StyledImage = styled(Image)<{ disabled: boolean }>`
  transition: all 0.3s ease-in-out;
  position: relative;
  height: 100%;

  ${RelatedContentImageContainer}:hover && {
    transform: ${(props) => (props.disabled ? 'none' : 'scale(1.1)')};
  }
`;

export const NoImage = styled(RelatedContentImageContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorButtonBackgroundSecondary};
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 1.5rem;
  padding: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: 2rem;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
`;

export const EmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;

  max-width: ${(props) => props.theme.grid.innerWidth}px;
  margin-left: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: calc(100% - 160px);
    margin: 0 auto 0 max(${(props) => props.theme.grid.outerMargin}px, 8.33vw);
  }
`;

export const RelatedContentTitle = styled(Heading3)`
  font-weight: 600;
  margin: 0;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 16px;
  }
`;

export const RelatedContentDescription = styled(Text)`
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${(props) => props.theme.grid.mobile.outerMargin}px 22px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0 ${(props) => props.theme.grid.outerMargin}px 60px;
  }

  @media (min-width: ${(props) =>
      props.theme.grid.innerWidth + props.theme.grid.outerMargin * 2}px) {
    align-self: center;
    width: ${(props) => props.theme.grid.innerWidth}px;
  }
`;
