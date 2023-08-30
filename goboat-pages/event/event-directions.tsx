import Map from '../../components/map/map';
import OnlyDesktop from '../../components/only-desktop';
import OnlyMobile from '../../components/only-mobile';
import Column from '../../components/section/column';
import { GridOptionValue } from '../../components/section/types';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { SpacingValue } from '../../styles/Theme';
import { Link } from '../../sub-components/Text';
import {
  DirectionsDetails,
  DirectionsHeading,
  EventDirectionsContainer,
  DirectionsSection,
  MapContainer,
} from './style';

interface EventDirectionProps {
  location?: string;
  address?: string;
  mapLink?: string;
  coordinates?: string;
}

const EventDirections = (props: EventDirectionProps) => {
  const { location, address, mapLink, coordinates } = props;

  const localize = useLocalize();

  const latitude = coordinates ? Number(coordinates?.split(', ')[0]) : undefined;
  const longitude = coordinates ? Number(coordinates?.split(', ')[1]) : undefined;

  return (
    <DirectionsSection
      template={[{ width: '1/3' }, { width: '2/3' }]}
      marginTop={SpacingValue.none}
      marginBottom={SpacingValue.none}
      paddingTop={SpacingValue.none}
      paddingBottom={SpacingValue.none}
      gridOptions={{ left: GridOptionValue.normal, right: GridOptionValue.normal }}
    >
      <Column>
        <EventDirectionsContainer>
          <div>
            <DirectionsHeading>{localize(Localization.directions)}</DirectionsHeading>
            <DirectionsDetails bold>{location}</DirectionsDetails>
            <DirectionsDetails>{address}</DirectionsDetails>
          </div>

          {mapLink && (
            <OnlyDesktop>
              <Link href={mapLink} target="_blank" arrow>
                {localize(Localization.viewOnGoogleMaps)}
              </Link>
            </OnlyDesktop>
          )}
        </EventDirectionsContainer>
      </Column>

      <Column
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
      >
        <MapContainer>
          <Map latitude={latitude} longitude={longitude} />
        </MapContainer>

        {mapLink && (
          <OnlyMobile>
            <Link href={mapLink} target="_blank" arrow>
              {localize(Localization.viewOnGoogleMaps)}
            </Link>
          </OnlyMobile>
        )}
      </Column>
    </DirectionsSection>
  );
};

export default EventDirections;
