import { EmblaOptionsType } from 'embla-carousel-react';

import RelatedContentHeading from './related-content-heading';
import useBreakpoint from '../../hooks/use-breakpoint';
import useCarousel from '../../hooks/use-carousel';
import { EmblaContainer, EmblaViewport, RelatedContentContainer } from './style';
import RelatedContentEntry from './related-content-entry';
import { RelatedArticle } from '../../goboat-pages/article';
import { RelatedEvent } from '../../goboat-pages/event/event';

const carouselOptions: EmblaOptionsType = {
  loop: false,
  align: 'start',
};

interface RelatedContentProps {
  heading: string;
  entries: RelatedArticle[] | RelatedEvent[] | undefined;
}

const RelatedContent = (props: RelatedContentProps) => {
  const { heading, entries } = props;

  const { isMobile } = useBreakpoint();

  const { viewportRef, scrollPrev, scrollNext, slides, selectedSlide } =
    useCarousel(carouselOptions);

  if (!entries || entries.length < 1) return null;

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
    <RelatedContentContainer>
      <RelatedContentHeading
        heading={heading}
        onPrev={handlePrev}
        onNext={handleNext}
        isPrevValid={isPrevValid}
        isNextValid={isNextValid}
      />

      <EmblaViewport ref={viewportRef}>
        <EmblaContainer>
          {entries.map((entry, index) => {
            return (
              <RelatedContentEntry
                key={entry.key}
                entry={entry}
                disabled={!isVisible(index)}
              />
            );
          })}
        </EmblaContainer>
      </EmblaViewport>
    </RelatedContentContainer>
  );
};

export default RelatedContent;
