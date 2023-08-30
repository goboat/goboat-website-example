import Image from 'next/image';

import { StyledLink } from '../../../sub-components/Text';
import { ImageLayout } from '../../image/image';
import {
  FeaturedContentImageButton,
  FeaturedContentImageContainer,
  NoImage,
  StyledImage,
} from './style';

interface FeaturedContentImageProps {
  src: string | undefined;
  blurDataURL: string | undefined;
  text: string;
  link: string;
  disabled: boolean;
}

const FeaturedArticlesImage = (props: FeaturedContentImageProps) => {
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
        <Image src="/d15.svg" width={10.67} height={10.67} alt="Arrow right" />
      </FeaturedContentImageButton>
    </FeaturedContentImageContainer>
  );
};

export default FeaturedArticlesImage;
