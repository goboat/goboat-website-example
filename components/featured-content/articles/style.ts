import styled from 'styled-components';

import { Heading3, SmallText } from '../../../sub-components/Text';
import Image from '../../image/image';

export const FeaturedContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.spacing.medium}px 0;
`;

export const Card = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  flex: 0 0 75vw;
  margin-right: 32px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    flex: 0 0 37.5vw;
    margin-right: 4.166vw;
  }
`;

export const FeaturedContentImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  height: 280px;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 25.2vw;
    margin-bottom: 32px;
  }
`;

export const FeaturedContentImageButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.colorButtonBackgroundFeatured};
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;

  min-width: 135px;
  height: 36px;
  border-top-left-radius: 12.5px;

  padding-left: 20px;
  padding-right: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    min-width: 120px;
    height: 36.67px;
    border-top-left-radius: 16px;

    padding-left: 21.33px;
    padding-right: 10.67px;
  }
`;

export const StyledImage = styled(Image)<{ disabled: boolean }>`
  transition: all 0.3s ease-in-out;
  position: relative;
  height: 100%;

  ${FeaturedContentImageContainer}:hover && {
    transform: ${(props) => (props.disabled ? 'none' : 'scale(1.1)')};
  }
`;

export const NoImage = styled(FeaturedContentImageContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorNoImageBackground};
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

export const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 32px ${(props) => props.theme.grid.mobile.outerMargin}px 0;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 88px ${(props) => props.theme.grid.outerMargin}px 0;
  }

  @media (min-width: ${(props) =>
      props.theme.grid.innerWidth +
      props.theme.grid.extendedColumnMaxWidth * 2 +
      props.theme.grid.outerMargin * 2}px) {
    align-self: center;
    width: ${(props) =>
      props.theme.grid.innerWidth + props.theme.grid.extendedColumnMaxWidth * 2}px;
  }
`;

export const ArticleTitle = styled(Heading3)`
  font-weight: 600;
  margin: 0;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 16px;
  }
`;

export const ArticleMeta = styled(SmallText)`
  display: inline;
  color: ${(props) => props.theme.colorTextSecondary};
  text-transform: capitalize;
  margin: 0;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 16px;
  }
`;
