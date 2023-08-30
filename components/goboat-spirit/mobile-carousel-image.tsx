import React from 'react';
import styled from 'styled-components';
import Image, { ImageLayout, ImageProps } from '../image/image';

export enum CarouselMode {
  slide = 'slide',
  fade = 'fade',
}

type SlideProps = {
  isSelected: boolean;
  transitionSpeed: number;
};

const EmblaSlide = styled.div<SlideProps>`
  position: relative;
  min-width: 100%;
  opacity: ${(props) => (props.isSelected ? '1' : '0.7')};
  transition: opacity ${(props) => props.transitionSpeed}s ease;
  z-index: 1;
  height: 100%;
`;

const EmblaSlideInner = styled.div`
  position: relative;
  overflow: hidden;
  height: 640px;
`;

export type MobileCarouselImageProps = {
  image: ImageProps;
  isSelected: boolean;
  heading: string;
  position: number;
  total: number;
};

const MobileCarouselImage = (props: MobileCarouselImageProps) => {
  const { isSelected } = props;

  const imageProps: ImageProps = {
    ...props.image,
    layout: ImageLayout.fill,
    objectFit: 'cover',
  };

  // don't send caption to image component, we take care of it
  delete imageProps.imageText;

  const slideProps: SlideProps = {
    isSelected,
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

export default MobileCarouselImage;
