import React from 'react';

import Image, { ImageLayout, ImageProps } from '../image/image';
import { EmblaSlide, EmblaSlideInner } from './style';

export enum CarouselMode {
  slide = 'slide',
  fade = 'fade',
}

export type SlideProps = {
  imageMargin: number;
  width: number;
  isSelected: boolean;
  mode: CarouselMode;
  transitionSpeed: number;
};

type CarouselImageProps = {
  imageMargin?: number;
  image: ImageProps;
  isSelected: boolean;
  width: number;
  mode: CarouselMode;
};

const CarouselImage = (props: CarouselImageProps) => {
  const { imageMargin, isSelected, width, mode } = props;

  const imageProps: ImageProps = {
    ...props.image,
    layout: ImageLayout.fill,
    objectFit: 'cover',
  };

  // don't send caption to image component, we take care of it
  delete imageProps.imageText;

  const slideProps: SlideProps = {
    imageMargin: imageMargin || 0,
    width,
    isSelected,
    mode,
    transitionSpeed: 0.5,
  };

  return (
    <EmblaSlide {...slideProps}>
      <EmblaSlideInner>
        <Image {...imageProps} />
      </EmblaSlideInner>
    </EmblaSlide>
  );
};

export default CarouselImage;
