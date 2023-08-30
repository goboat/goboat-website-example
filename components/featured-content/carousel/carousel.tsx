import CarouselSlide from './carousel-slide';
import { EmblaViewport, EmblaContainer } from './style';
import { ContentImage } from '../../image/image';

export type FeaturedCarouselProps = {
  slides: {
    image?: ContentImage;
    url: string;
  }[];
  selectedSlide: number;
  emblaViewportRef: any;
};

// space between images in pxs
const imageMargin = 0;

const Carousel = (props: FeaturedCarouselProps) => {
  const { emblaViewportRef, selectedSlide } = props;

  return (
    <div>
      <EmblaViewport ref={emblaViewportRef}>
        <EmblaContainer imageMargin={imageMargin}>
          {props.slides.map((slide, index) => {
            const carouselSlideProps = {
              ...slide,
              imageMargin,
              isSelected: selectedSlide === index,
            };

            return <CarouselSlide {...carouselSlideProps} key={index} />;
          })}
        </EmblaContainer>
      </EmblaViewport>
    </div>
  );
};

export default Carousel;
