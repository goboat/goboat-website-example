import { useState } from 'react';

import useLocale from '../../hooks/use-locale';
import { SpacingValue } from '../../styles/Theme';
import Button, { ButtonSize, ButtonType } from '../../sub-components/buttons/button';
import { Heading2, Text, TextColor } from '../../sub-components/Text';
import { ImageLayout } from '../image/image';
import Column from '../section/column';
import Section from '../section/section';
import { GridOptionValue } from '../section/types';
import { LocationsProps } from './locations';
import {
  LocationsButtonGroup,
  LocationsImage,
  LocationsImageWrapper,
  NoImage,
} from './style';

const LocationsDesktop = (props: LocationsProps) => {
  const { heading, paragraph, entries } = props;

  const locale = useLocale();

  const defaultLocation = entries?.[0];
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

  return (
    <Section
      template={[{ width: '1/3' }, { width: '2/3' }]}
      marginTop={SpacingValue.none}
      marginBottom={SpacingValue.large}
      paddingTop={SpacingValue.none}
      paddingBottom={SpacingValue.none}
      gridOptions={{ left: GridOptionValue.extended, right: GridOptionValue.full }}
    >
      <Column>
        <Heading2>{heading}</Heading2>
        <Text color={TextColor.secondary}>{paragraph}</Text>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LocationsButtonGroup>
            {entries?.map((location) => (
              <Button
                key={location.__reference}
                text={location.location_names?.[locale] ?? location.post_title}
                link={{ url: location?.pages?.[locale] ?? `/${locale}` }}
                visualType={ButtonType.secondary}
                size={ButtonSize.full}
                marginTop={SpacingValue.none}
                marginBottom={SpacingValue.none}
                onMouseEnter={() => setSelectedLocation(location)}
              />
            ))}
          </LocationsButtonGroup>
        </div>
      </Column>

      <Column>
        <LocationsImageWrapper>
          {entries?.map((location) => {
            if (location.featured_info?.image?.url) {
              return (
                <LocationsImage
                  key={location.__reference}
                  image={{
                    url: location.featured_info?.image?.url,
                    width: location.featured_info?.image?.width,
                    height: location.featured_info?.image?.height,
                  }}
                  layout={ImageLayout.fill}
                  objectFit={'cover'}
                  selected={location.__reference === selectedLocation?.__reference}
                  link={{ url: location?.pages?.[locale] ?? `/${locale}` }}
                />
              );
            } else {
              return <NoImage key={location.__reference}>No featured image</NoImage>;
            }
          })}
        </LocationsImageWrapper>
      </Column>
    </Section>
  );
};

export default LocationsDesktop;
