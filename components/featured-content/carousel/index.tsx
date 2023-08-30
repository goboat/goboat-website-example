import { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import Carousel, { FeaturedCarouselProps } from './carousel';
import NavigationDots from './navigation-dots';
import NavigationArrows from './navigation-arrows';
import SlideDetails from './slide-details';
import useCarousel from '../../../hooks/use-carousel';
import { SpacingValue } from '../../../styles/Theme';
import { GridOptionValue, RenderedSectionProps } from '../../section/types';
import {
  BottomRow,
  FeaturedCarouselSection,
  StyledHeading,
  StyledParagraph,
  TopRow,
} from './style';
import Column from '../../section/column';
import { FeaturedContentProps } from '../types';

const commonSectionProps = {
  template: [
    {
      width: 4,
    },
    {
      width: 8,
    },
  ],
  blockName: 'next24hr/section',
  marginTop: SpacingValue.large,
  marginBottom: SpacingValue.large,
  paddingTop: SpacingValue.none,
  paddingBottom: SpacingValue.none,
  gridOptions: {
    left: GridOptionValue.extended,
    right: GridOptionValue.extended,
  },
};

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: 'center',
  skipSnaps: false,
};

const autoplayOptions = { delay: 4000, stopOnInteraction: false };
const autoplay = Autoplay(autoplayOptions);

// DEPLOY!

const FeaturedCarousel = (props: FeaturedContentProps) => {
  const { heading, paragraph, entries } = props;

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

  const sectionProps: RenderedSectionProps = commonSectionProps;

  const slides = entries.map((entry) => {
    return {
      image: entry.content.featured_info?.image,
      heading: entry.overwrites?.title || entry.content.post_title || '',
      teaser: entry.overwrites?.teaser || entry.content.featured_info?.teaser || '',
      url: entry.content.adjusted_permalink || entry.key,
    };
  });

  const carouselProps: FeaturedCarouselProps = {
    slides,
    selectedSlide,
    emblaViewportRef: viewportRef,
  };

  return (
    <FeaturedCarouselSection {...sectionProps}>
      <Column>
        <TopRow>
          <StyledHeading>{heading}</StyledHeading>

          <NavigationArrows
            onNext={handleNext}
            onPrev={handlePrev}
            arrowWidth={26}
            arrowHeight={26}
            platform="mobile"
          />
        </TopRow>

        <StyledParagraph>{paragraph}</StyledParagraph>
      </Column>

      <Column>
        <Carousel {...carouselProps} />

        <NavigationDots total={slides.length} selectedSlide={selectedSlide} />

        <BottomRow>
          <SlideDetails slides={slides} selectedSlide={selectedSlide} />

          <NavigationArrows
            onNext={handleNext}
            onPrev={handlePrev}
            arrowWidth={56}
            arrowHeight={56}
            platform="desktop"
          />
        </BottomRow>
      </Column>
    </FeaturedCarouselSection>
  );
};

export default FeaturedCarousel;
