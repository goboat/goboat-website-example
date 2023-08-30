import { EmblaOptionsType } from 'embla-carousel-react';

import useBreakpoint from '../../../hooks/use-breakpoint';
import FeaturedCardsHeading from './featured-cards-heading';
import FeaturedCardsEntry from './featured-cards-entry';
import useCarousel from '../../../hooks/use-carousel';
import { EmblaContainer, EmblaViewport, FeaturedContentContainer } from './style';
import { FeaturedContentProps } from '../types';

const carouselOptions: EmblaOptionsType = {
  loop: false,
  align: 'start',
};

const FeaturedCards = (props: FeaturedContentProps) => {
  const { isMobile } = useBreakpoint();
  const { viewportRef, scrollPrev, scrollNext, slides, selectedSlide } =
    useCarousel(carouselOptions);

  const isPrevValid = selectedSlide !== 0;

  const isNextValidModifier = isMobile ? 1 : 2;
  const isNextValid = selectedSlide + isNextValidModifier < slides.length;

  const handlePrev = () => {
    if (isPrevValid) scrollPrev();
  };

  const handleNext = () => {
    if (isNextValid) scrollNext();
  };

  const isVisible = (index: number) => {
    // Only one entry visible at a time
    if (isMobile) return index === selectedSlide;

    // Two entries visible at a time
    return index === selectedSlide || index - 1 === selectedSlide;
  };

  return (
    <FeaturedContentContainer
      backgroundStyle={props.backgroundStyle}
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      paddingTop={props.paddingTop}
      paddingBottom={props.paddingBottom}
    >
      <FeaturedCardsHeading
        heading={props.heading}
        onPrev={handlePrev}
        onNext={handleNext}
        isPrevValid={isPrevValid}
        isNextValid={isNextValid}
      />

      <EmblaViewport ref={viewportRef}>
        <EmblaContainer>
          {props?.entries?.map((entry, index) => {
            return (
              <FeaturedCardsEntry
                key={entry.key}
                entry={entry}
                disabled={!isVisible(index)}
              />
            );
          })}
        </EmblaContainer>
      </EmblaViewport>
    </FeaturedContentContainer>
  );
};

export default FeaturedCards;
