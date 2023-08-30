import { GenericContentType } from '../../lib/types';
import { ImageLayout, ImageProps } from '../image/image';
import { SeeAlsoNoImage, StyledImage } from './style';

interface SeeAlsoImageProps {
  image: NonNullable<GenericContentType['featured_info']>['image'];
}

const SeeAlsoImage = (props: SeeAlsoImageProps) => {
  if (!props.image || !props.image.url) {
    return <SeeAlsoNoImage>No featured image</SeeAlsoNoImage>;
  }

  const imageProps: ImageProps = {
    image: {
      url: props.image.url,
      blurDataURL: props.image.blurDataURL,
      width: 227,
      height: 121,
    },
    layout: ImageLayout.responsive,
    objectFit: 'cover',
  };

  return <StyledImage {...imageProps} />;
};

export default SeeAlsoImage;
