import styled, {
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';

import { Heading3 } from '../../../sub-components/Text';
import Image from '../../image/image';
import { SpacingValue } from '../../../styles/Theme';
import { getPixelClamp } from '../../../lib/utils';

interface FeaturedContentContainerProps {
  backgroundStyle: FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<any>>;
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
  paddingTop: SpacingValue;
  paddingBottom: SpacingValue;
}

export const FeaturedContentContainer = styled.div<FeaturedContentContainerProps>`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.spacing[props.marginTop]}px 0
    ${(props) => props.theme.spacing[props.marginBottom]}px;
  padding: ${(props) => props.theme.spacing[props.paddingTop]}px 0
    ${(props) => props.theme.spacing[props.paddingBottom]}px;
  ${(props) => props.backgroundStyle}
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

export const FeaturedContentImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  height: 280px;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 24.1vw;
    margin-bottom: 16px;
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
    height: auto;
    border-top-left-radius: 16px;

    padding-top: ${getPixelClamp(17)};
    padding-bottom: ${getPixelClamp(15)};
    padding-left: ${getPixelClamp(32)};
    padding-right: ${getPixelClamp(16)};
  }
`;

export const StyledImage = styled(Image)<{ disabled: boolean }>`
  transition: all 0.3s ease-in-out;
  height: 100%;
  position: relative;

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

export const EntryTitle = styled(Heading3)`
  font-weight: 600;
  margin: 0;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 16px;
  }
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
