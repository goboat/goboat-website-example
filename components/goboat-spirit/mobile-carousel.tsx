import { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { ImageProps } from '../image/image';
import { Text } from '../../sub-components/Text';
import MobileCarouselImage, { MobileCarouselImageProps } from './mobile-carousel-image';
import useCarousel from '../../hooks/use-carousel';
import {
  EmblaViewport,
  MobileEmblaContainer,
  MobileHeadingRow,
  MobileWrapper,
  MobileContentWrapper,
  NoWrapHeading,
} from './style';

export type MobileCarouselProps = {
  images: ImageProps[];
  heading: string;
};

const carouselOptions: EmblaOptionsType = {
  loop: true,
  skipSnaps: false,
};

const autoplayOptions = { delay: 4000, stopOnInteraction: false };
const autoplay = Autoplay(autoplayOptions);

const MobileCarousel = (props: MobileCarouselProps) => {
  const { viewportRef, selectedSlide } = useCarousel(carouselOptions, [autoplay]);

  const { images, heading } = props;

  return (
    <MobileWrapper>
      <EmblaViewport ref={viewportRef}>
        {/* First loop is for images, since they transition by scrolling  */}
        <MobileEmblaContainer>
          {images.map((image, index) => {
            const imageProps: MobileCarouselImageProps = {
              image,
              heading,
              isSelected: selectedSlide === index,
              position: index + 1,
              total: images.length,
            };

            return <MobileCarouselImage {...imageProps} key={image.image.url} />;
          })}
        </MobileEmblaContainer>
        {/* Second loop for texts that transition by fading into eachother  */}
        <div style={{ position: 'relative', height: '240px' }}>
          {images.map((image, index) => {
            return (
              <MobileContentWrapper
                key={image.image.url}
                isSelected={selectedSlide === index}
              >
                <MobileHeadingRow>
                  <NoWrapHeading>{props.heading}</NoWrapHeading>
                  <NoWrapHeading>
                    {index + 1} / {images.length}
                  </NoWrapHeading>
                </MobileHeadingRow>
                <Text>{image.imageText}</Text>
              </MobileContentWrapper>
            );
          })}
        </div>
      </EmblaViewport>
    </MobileWrapper>
  );
};

export default MobileCarousel;
