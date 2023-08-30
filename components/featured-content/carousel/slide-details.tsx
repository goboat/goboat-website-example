import Link from 'next/link';

import {
  SlideDetailsGrid,
  SlideDetailsContainer,
  SlideHeading,
  SlideTeaser,
} from './style';

interface SlideDetailsProps {
  slides: {
    image:
      | {
          url: string;
          blurDataURL?: string | undefined;
        }
      | undefined;
    heading: string;
    teaser: string;
    url: string;
  }[];
  selectedSlide: number;
}

const SlideDetails = (props: SlideDetailsProps) => {
  const { slides, selectedSlide } = props;

  return (
    <SlideDetailsGrid>
      {slides.map((slide, index) => (
        <SlideDetailsContainer isSelected={selectedSlide === index} key={slide.heading}>
          <Link href={slide.url}>
            <a>
              <SlideHeading>{slide.heading}</SlideHeading>
              <SlideTeaser>{slide.teaser}</SlideTeaser>
            </a>
          </Link>
        </SlideDetailsContainer>
      ))}
    </SlideDetailsGrid>
  );
};

export default SlideDetails;
