import { UseEmblaCarouselType } from 'embla-carousel-react';

import { ImageProps } from '../image/image';
import CarouselImage, { CarouselMode } from './desktop-carousel-image';
import { DesktopWrapper, EmblaContainer, EmblaViewport } from './style';

export type DesktopCarouselProps = {
  images: ImageProps[];
  viewportRef: UseEmblaCarouselType[0];
  selectedSlide: number;
};

const DesktopCarousel = (props: DesktopCarouselProps) => {
  const { images } = props;

  return (
    <DesktopWrapper>
      <EmblaViewport ref={props.viewportRef}>
        <EmblaContainer>
          {images.map((image, index) => {
            const imageProps = {
              image,
              isSelected: props.selectedSlide === index,
              width: 100,
              mode: CarouselMode.fade,
            };

            return <CarouselImage {...imageProps} key={image.image.url} />;
          })}
        </EmblaContainer>
      </EmblaViewport>
    </DesktopWrapper>
  );
};

export default DesktopCarousel;
