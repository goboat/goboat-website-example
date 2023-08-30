import { EmblaOptionsType } from 'embla-carousel-react';

import FeaturedArticlesHeading from './featured-articles-heading';
import FeaturedArticlesEntry from './featured-articles-entry';
import { Link } from '../../../sub-components/Text';
import useBreakpoint from '../../../hooks/use-breakpoint';
import useCarousel from '../../../hooks/use-carousel';
import {
  BottomRow,
  EmblaContainer,
  EmblaViewport,
  FeaturedContentContainer,
} from './style';
import { FeaturedContentProps } from '../types';

const carouselOptions: EmblaOptionsType = {
  loop: false,
  align: 'start',
};

const FeaturedArticles = (props: FeaturedContentProps) => {
  const { heading, linkText, linkUrl, entries } = props;

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
    <FeaturedContentContainer>
      <FeaturedArticlesHeading
        heading={heading}
        onPrev={handlePrev}
        onNext={handleNext}
        isPrevValid={isPrevValid}
        isNextValid={isNextValid}
      />

      <EmblaViewport ref={viewportRef}>
        <EmblaContainer>
          {entries?.map((entry, index) => {
            return (
              <FeaturedArticlesEntry
                key={entry.key}
                entry={entry}
                disabled={!isVisible(index)}
              />
            );
          })}
        </EmblaContainer>
      </EmblaViewport>

      {linkText && linkUrl && (
        <BottomRow>
          <Link href={linkUrl} arrow>
            {linkText}
          </Link>
        </BottomRow>
      )}
    </FeaturedContentContainer>
  );
};

export default FeaturedArticles;
