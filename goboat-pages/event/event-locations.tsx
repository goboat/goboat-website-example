import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { SpacingValue } from '../../styles/Theme';
import { ButtonAlign } from '../../sub-components/buttons/button';
import ButtonLink from '../../sub-components/buttons/button-link';
import { ButtonGroup, LocationsContainer, LocationsHeading } from './style';

interface EventLocationsProps {
  locations: any[] | undefined;
}

const EventLocations = (props: EventLocationsProps) => {
  const localize = useLocalize();

  if (!props.locations || props.locations.length < 1) return null;

  return (
    <LocationsContainer>
      <LocationsHeading>{localize(Localization.eventsInOtherCities)}</LocationsHeading>

      <ButtonGroup>
        {props.locations.map((location) => (
          <ButtonLink
            align={ButtonAlign.left}
            key={location.city}
            link={{ url: location.url }}
            text={location.city}
            marginTop={SpacingValue.none}
            marginBottom={SpacingValue.none}
          />
        ))}
      </ButtonGroup>
    </LocationsContainer>
  );
};

export default EventLocations;
