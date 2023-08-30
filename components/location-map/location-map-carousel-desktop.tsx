import { UseEmblaCarouselType } from 'embla-carousel-react';
import Link from 'next/link';
import useLocale from '../../hooks/use-locale';

import { goboat } from '../../styles/Theme';
import Image, { ImageLayout } from '../image/image';
import { AutopopulatedLocationContentType } from '../locations/locations';
import {
  EmblaContainer,
  EmblaSlide,
  EmblaSlideInner,
  EmblaViewport,
  LocationName,
  MapImage,
  MapImageContainer,
} from './style';

const outerGridBreakPoint =
  goboat.grid.innerWidth +
  2 * goboat.grid.outerMargin +
  2 * goboat.grid.extendedColumnMinWidth;

interface CarouselDesktopProps {
  entries: AutopopulatedLocationContentType[];
  emblaViewPortRef: UseEmblaCarouselType[0];
  selectedSlide: number;
  mapLinkHover: boolean;
  setMapLinkHover: React.Dispatch<React.SetStateAction<boolean>>;
}

const CarouselDesktop = (props: CarouselDesktopProps) => {
  const { entries, emblaViewPortRef, selectedSlide, mapLinkHover, setMapLinkHover } =
    props;

  const activeLocale = useLocale();

  return (
    <>
      <EmblaViewport ref={emblaViewPortRef} outerGridBreakPoint={outerGridBreakPoint}>
        <EmblaContainer>
          {entries.map((entry) => {
            const locationName = entry.location_names?.[activeLocale] ?? entry.post_title;
            const backgroundImageUrl = entry.featured_info?.image?.url ?? '';

            return (
              <EmblaSlide key={entry.__reference}>
                <EmblaSlideInner>
                  <Image
                    image={{ url: backgroundImageUrl }}
                    layout={ImageLayout.fill}
                    objectFit="cover"
                    alt={`Featured image for the ${locationName} location`}
                  />
                </EmblaSlideInner>
              </EmblaSlide>
            );
          })}
        </EmblaContainer>
      </EmblaViewport>

      {entries.map((entry, index: number) => {
        const locationName = entry.location_names?.[activeLocale] ?? entry.post_title;
        const mapPreviewUrl = entry.map_previews?.[activeLocale]?.url;
        const mapUrl = entry.maps?.[activeLocale]?.url;

        if (!mapUrl || !mapPreviewUrl) return null;

        return (
          <MapImageContainer
            key={entry.__reference}
            outerGridBreakPoint={outerGridBreakPoint}
            isSelected={selectedSlide === index}
            onMouseEnter={() => setMapLinkHover(true)}
            onMouseLeave={() => setMapLinkHover(false)}
          >
            <Link href={mapUrl}>
              <a target="_blank">
                <MapImage
                  image={{ url: mapPreviewUrl }}
                  layout={ImageLayout.fill}
                  objectFit="cover"
                  mapLinkHover={mapLinkHover}
                />
              </a>
            </Link>
            <LocationName>{locationName}</LocationName>
          </MapImageContainer>
        );
      })}
    </>
  );
};

export default CarouselDesktop;
