import { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import CarouselImage from './carousel-image';
import { Heading1 } from '../../sub-components/Text';
import { SpacingValue } from '../../styles/Theme';
import { ImageProps } from '../image/image';
import useCarousel from '../../hooks/use-carousel';
import OnlyMobile from '../only-mobile';
import {
  EmblaViewport,
  EmblaContainer,
  FirstRow,
  ArrowIcon,
  IconsContainer,
} from './style';
import OnlyDesktop from '../only-desktop';

type CarouselProps = {
  heading: string;
  images: ImageProps[];
};

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: 'center',
  skipSnaps: false,
};

const autoplayOptions = { delay: 4000, stopOnInteraction: false };
const autoplay = Autoplay(autoplayOptions);

const Carousel = (props: CarouselProps) => {
  const { viewportRef, scrollPrev, scrollNext, selectedSlide } = useCarousel(
    carouselOptions,
    [autoplay]
  );

  const handlePrev = () => {
    scrollPrev();
    autoplay.reset();
  };

  const handleNext = () => {
    scrollNext();
    autoplay.reset();
  };

  return (
    <div>
      <OnlyDesktop>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FirstRow>
            <Heading1 marginTop={SpacingValue.none} marginBottom={SpacingValue.none}>
              {props.heading}
            </Heading1>
            <IconsContainer>
              <ArrowIcon onClick={handlePrev}>
                <Image src="/d13.svg" width={56} height={56} alt="Arrow left" />
              </ArrowIcon>
              <ArrowIcon onClick={handleNext}>
                <Image src="/d12.svg" width={56} height={56} alt="Arrow right" />
              </ArrowIcon>
            </IconsContainer>
          </FirstRow>
        </div>
      </OnlyDesktop>

      <EmblaViewport ref={viewportRef}>
        <EmblaContainer>
          {props.images.map((image, index) => {
            const carouselImageProps = {
              image,
              position: index + 1,
              total: props.images.length,
              isSelected: selectedSlide === index,
            };
            return <CarouselImage {...carouselImageProps} key={image.image.url} />;
          })}
        </EmblaContainer>
      </EmblaViewport>
    </div>
  );
};

export default Carousel;
