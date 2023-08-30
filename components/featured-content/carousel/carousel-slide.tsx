import React from 'react';

import Image, { ContentImage, ImageLayout, ImageProps } from '../../image/image';
import { EmblaSlide, EmblaSlideInner, NoImage } from './style';

type CarouselSlideProps = {
  imageMargin: number;
  image?: ContentImage;
  isSelected: boolean;
  url: string;
};

const CarouselSlide = (props: CarouselSlideProps) => {
  const { imageMargin, isSelected, url } = props;

  let ImageComponent;

  if (props.image?.url) {
    const imageProps: ImageProps = {
      image: props.image,
      layout: ImageLayout.fill,
      objectFit: 'cover',
      link: {
        url,
      },
    };
    ImageComponent = <Image {...imageProps} />;
  } else {
    ImageComponent = <NoImage>No Featured Image</NoImage>;
  }

  return (
    <EmblaSlide imageMargin={imageMargin} isSelected={isSelected}>
      <EmblaSlideInner>{ImageComponent}</EmblaSlideInner>
    </EmblaSlide>
  );
};

export default CarouselSlide;
