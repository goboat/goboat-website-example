import { useState } from 'react';
import NextImage from 'next/image';
import { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { goboat, SpacingValue } from '../../styles/Theme';
import { Heading1, Link, Text } from '../../sub-components/Text';
import { ArrowIcon, IconsContainer } from '../carousel/style';
import Section from '../section/section';
import { GridOptionValue } from '../section/types';
import CarouselDesktop from './location-map-carousel-desktop';
import CarouselMobile from './location-map-carousel-mobile';
import useCarousel from '../../hooks/use-carousel';
import useLocale from '../../hooks/use-locale';
import {
  BottomRow,
  MapLayout,
  MapLink,
  MiddleRow,
  MiddleRowMobile,
  Paragraph,
  TopRow,
  TopRowMobile,
} from './style';
import { AutopopulatedLocationContentType } from '../locations/locations';
import useFrontPageLink from '../../hooks/use-front-page-link';

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: 'start',
};

const autoplayOptions = { delay: 4000, stopOnInteraction: false };
const autoplay = Autoplay(autoplayOptions);

const outerGridBreakPoint =
  goboat.grid.innerWidth +
  2 * goboat.grid.outerMargin +
  2 * goboat.grid.extendedColumnMinWidth;

interface LocationMapProps {
  heading: string;
  paragraph?: string;
  linkText?: string;
  entries: AutopopulatedLocationContentType[];
}

const LocationMap = (props: LocationMapProps) => {
  let { heading, paragraph, linkText, entries } = props;

  // Filter out unpublished locations
  entries = entries.filter((entry) => entry.permalink);

  const [mapLinkHover, setMapLinkHover] = useState(false);
  const activeLocale = useLocale();
  const { frontPageLink } = useFrontPageLink();

  const carouselPlugins = entries.length > 1 ? [autoplay] : [];

  const { viewportRef, scrollPrev, scrollNext, scrollTo, selectedSlide } = useCarousel(
    carouselOptions,
    carouselPlugins
  );

  const handlePrev = () => {
    scrollPrev();
    autoplay.reset();
  };

  const handleNext = () => {
    scrollNext();
    autoplay.reset();
  };

  // Sync desktop and mobile carousel
  const handleOnMobileScroll = (index: number) => {
    if (selectedSlide !== index) {
      scrollTo(index);

      autoplay.reset();
    }
  };

  const mapUrl = entries[selectedSlide]?.maps?.[activeLocale]?.url ?? frontPageLink;

  return (
    <Section
      marginTop={SpacingValue.none}
      marginBottom={SpacingValue.none}
      paddingTop={SpacingValue.none}
      paddingBottom={SpacingValue.none}
      gridOptions={{ left: GridOptionValue.extended, right: GridOptionValue.extended }}
      template={[{ width: '1/1' }]}
      subgrid
    >
      <MapLayout>
        <TopRow>
          <Heading1 style={{ margin: 0 }}>{heading}</Heading1>

          {entries.length > 1 && (
            <IconsContainer style={{ verticalAlign: 'middle' }}>
              <ArrowIcon onClick={handlePrev}>
                <NextImage src="/d13.svg" width={56} height={56} alt="Arrow left" />
              </ArrowIcon>

              <ArrowIcon onClick={handleNext}>
                <NextImage src="/d12.svg" width={56} height={56} alt="Arrow right" />
              </ArrowIcon>
            </IconsContainer>
          )}
        </TopRow>

        <TopRowMobile>
          <Heading1 style={{ margin: 0 }}>{heading}</Heading1>
        </TopRowMobile>

        <MiddleRow>
          <CarouselDesktop
            entries={entries}
            emblaViewPortRef={viewportRef}
            selectedSlide={selectedSlide}
            mapLinkHover={mapLinkHover}
            setMapLinkHover={setMapLinkHover}
          />
        </MiddleRow>

        <MiddleRowMobile>
          <CarouselMobile
            entries={entries}
            selectedSlide={selectedSlide}
            onScroll={handleOnMobileScroll}
          />
        </MiddleRowMobile>

        <BottomRow outerGridBreakPoint={outerGridBreakPoint}>
          <Paragraph outerGridBreakPoint={outerGridBreakPoint}>
            <Text style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{paragraph}</Text>
          </Paragraph>

          <MapLink>
            <Link
              href={mapUrl}
              target="_blank"
              onMouseEnter={() => setMapLinkHover(true)}
              onMouseLeave={() => setMapLinkHover(false)}
              arrow
            >
              {linkText}
            </Link>
          </MapLink>
        </BottomRow>
      </MapLayout>
    </Section>
  );
};

export default LocationMap;
