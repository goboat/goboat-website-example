import { AutopopulatedContentType } from '../../lib/types';
import OnlyDesktop from '../only-desktop';
import OnlyMobile from '../only-mobile';
import LocationsDesktop from './locations-desktop';
import LocationsMobile from './locations-mobile';

interface Map {
  url?: string;
}

interface MapPreviewImage {
  url?: string;
  blurDataURL?: string;
}
export interface AutopopulatedLocationContentType extends AutopopulatedContentType {
  pages: {
    [language: string]: string;
  };
  shop_id?: string;
  location_names: Record<string, string>;
  maps?: Record<string, Map>;
  map_previews?: Record<string, MapPreviewImage>;
}

export interface LocationsProps {
  heading: string;
  paragraph: string;
  entries: AutopopulatedLocationContentType[];
}

const Locations = (props: LocationsProps) => {
  // Filter out unpublished locations
  const locationsProps = {
    ...props,
    entries: props.entries.filter((entry) => entry.permalink),
  };

  return (
    <>
      <OnlyDesktop>
        <LocationsDesktop {...locationsProps} />
      </OnlyDesktop>

      <OnlyMobile>
        <LocationsMobile {...locationsProps} />
      </OnlyMobile>
    </>
  );
};

export default Locations;
