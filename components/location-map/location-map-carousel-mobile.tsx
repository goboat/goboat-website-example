import { useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel-react';
import NextImage from 'next/image';

import { goboat } from '../../styles/Theme';
import Image, { ImageLayout } from '../image/image';
import { ArrowIcon, IconsContainer } from '../carousel/style';
import useCarousel from '../../hooks/use-carousel';
import {
  EmblaContainer,
  EmblaSlide,
  EmblaSlideInnerMobile,
  EmblaSlideInnerMobileImages,
  EmblaViewport,
  LocationNameMobile,
  MapImageMobile,
  NavigationArrowsMobile,
} from './style';
import useLocale from '../../hooks/use-locale';
import Link from 'next/link';
import { AutopopulatedLocationContentType } from '../locations/locations';
import useFrontPageLink from '../../hooks/use-front-page-link';

const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: 'start',
};

const outerGridBreakPoint =
  goboat.grid.innerWidth +
  2 * goboat.grid.outerMargin +
  2 * goboat.grid.extendedColumnMinWidth;

interface CarouselMobileProps {
  entries: AutopopulatedLocationContentType[];
  selectedSlide: number;
  onScroll: (index: number) => void;
}

const CarouselMobile = (props: CarouselMobileProps) => {
  const { entries, selectedSlide: desktopSelectedSlide, onScroll } = props;
  const activeLocale = useLocale();
  const { frontPageLink } = useFrontPageLink();

  const { viewportRef, scrollPrev, scrollNext, scrollTo, selectedSlide } =
    useCarousel(carouselOptions);

  // Pass scroll events to desktop carousel
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onScroll(selectedSlide), [selectedSlide]);

  // Sync desktop and mobile carousel
  useEffect(() => {
    if (selectedSlide !== desktopSelectedSlide) {
      scrollTo(desktopSelectedSlide);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktopSelectedSlide]);

  return (
    <EmblaViewport ref={viewportRef} outerGridBreakPoint={outerGridBreakPoint}>
      <EmblaContainer>
        {entries.map((entry) => {
          const backgroundImageUrl = entry.featured_info?.image?.url ?? '';
          const mapPreviewUrl = entry.map_previews?.[activeLocale]?.url;
          const mapUrl = entry.maps?.[activeLocale]?.url ?? frontPageLink;
          const locationName = entry.location_names?.[activeLocale] ?? entry.post_title;

          return (
            <EmblaSlide key={entry.__reference}>
              <EmblaSlideInnerMobile>
                <Link href={mapUrl}>
                  <a target="_blank">
                    <LocationNameMobile>{locationName}</LocationNameMobile>
                    <EmblaSlideInnerMobileImages>
                      <MapImageMobile
                        image={{ url: backgroundImageUrl }}
                        layout={ImageLayout.fill}
                        objectFit="cover"
                      />
                      {mapPreviewUrl && (
                        <MapImageMobile
                          image={{ url: mapPreviewUrl }}
                          layout={ImageLayout.fill}
                          objectFit="cover"
                        />
                      )}
                    </EmblaSlideInnerMobileImages>
                  </a>
                </Link>
              </EmblaSlideInnerMobile>
            </EmblaSlide>
          );
        })}
      </EmblaContainer>

      {entries.length > 1 && (
        <NavigationArrowsMobile>
          <IconsContainer>
            <ArrowIcon onClick={scrollPrev}>
              <NextImage src="/d13.svg" width={26} height={26} alt="Arrow left" />
            </ArrowIcon>

            <ArrowIcon onClick={scrollNext}>
              <NextImage src="/d12.svg" width={26} height={26} alt="Arrow right" />
            </ArrowIcon>
          </IconsContainer>
        </NavigationArrowsMobile>
      )}
    </EmblaViewport>
  );
};

export default CarouselMobile;
