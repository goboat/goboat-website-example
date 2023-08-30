import Image from 'next/image';

import { StyledLink } from '../../../sub-components/Text';
import { ImageLayout } from '../../image/image';
import {
  FeaturedContentImageButton,
  FeaturedContentImageContainer,
  NoImage,
  StyledImage,
} from './style';
import styled from 'styled-components';
import { getPixelClamp } from '../../../lib/utils';

interface FeaturedContentImageProps {
  src: string | undefined;
  blurDataURL: string | undefined;
  text: string;
  disabled: boolean;
}

const ArrowIcon = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 0;
  width: 12px;
  height: 12px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: ${getPixelClamp(16)};
    height: ${getPixelClamp(16)};
  }
`;

const FeaturedCardsImage = (props: FeaturedContentImageProps) => {
  const { src, blurDataURL, text, disabled } = props;

  if (!src) return <NoImage>No featured image</NoImage>;

  return (
    <FeaturedContentImageContainer>
      <StyledImage
        image={{
          url: src,
          blurDataURL: blurDataURL,
        }}
        layout={ImageLayout.fill}
        objectFit="cover"
        altText={text}
        disabled={disabled}
      />

      <FeaturedContentImageButton>
        <StyledLink as="span" style={{ marginRight: '8px' }}>
          {text}
        </StyledLink>
        <ArrowIcon>
          <Image
            src="/d15.svg"
            width={10.67}
            height={10.67}
            layout="responsive"
            alt="Arrow right"
          />
        </ArrowIcon>
      </FeaturedContentImageButton>
    </FeaturedContentImageContainer>
  );
};

export default FeaturedCardsImage;
