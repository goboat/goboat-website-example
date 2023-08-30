import { ImageLayout } from '../image/image';
import { RelatedContentImageContainer, NoImage, StyledImage } from './style';

interface FeaturedContentImageProps {
  src: string | undefined;
  blurDataURL: string | undefined;
  disabled: boolean;
}

const RelatedContentImage = (props: FeaturedContentImageProps) => {
  const { src, blurDataURL, disabled } = props;

  if (!src) return <NoImage>No featured image</NoImage>;

  return (
    <RelatedContentImageContainer>
      <StyledImage
        image={{
          url: src,
          blurDataURL: blurDataURL,
        }}
        layout={ImageLayout.fill}
        objectFit="cover"
        disabled={disabled}
      />
    </RelatedContentImageContainer>
  );
};

export default RelatedContentImage;
