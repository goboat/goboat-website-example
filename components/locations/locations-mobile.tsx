import Link from 'next/link';

import useLocale from '../../hooks/use-locale';
import { SpacingValue } from '../../styles/Theme';
import { Heading2, Heading3, Text, TextColor } from '../../sub-components/Text';
import Chevron from '../icons/chevron';
import { ImageLayout } from '../image/image';
import Column from '../section/column';
import Section from '../section/section';
import { GridOptionValue } from '../section/types';
import { LocationsProps } from './locations';
import { LocationCard, LocationCardGroup, LocationCardImage, NoImage } from './style';

const LocationsMobile = (props: LocationsProps) => {
  const { heading, paragraph, entries } = props;

  const locale = useLocale();

  return (
    <Section
      template={[{ width: '1/1' }]}
      marginTop={SpacingValue.none}
      marginBottom={SpacingValue.xlarge}
      paddingTop={SpacingValue.none}
      paddingBottom={SpacingValue.none}
      gridOptions={{ left: GridOptionValue.normal, right: GridOptionValue.normal }}
    >
      <Column>
        <Heading2 marginBottom={SpacingValue.small}>{heading}</Heading2>
        <Text
          color={TextColor.secondary}
          marginTop={SpacingValue.none}
          marginBottom={SpacingValue.smallx}
        >
          {paragraph}
        </Text>

        {entries?.map((location) => {
          return (
            <Link
              href={location?.pages?.[locale] ?? `/${locale}`}
              key={location.__reference}
            >
              <a>
                <LocationCard>
                  {location.featured_info?.image?.url ? (
                    <LocationCardImage
                      image={{
                        url: location.featured_info?.image?.url,
                        width: location.featured_info?.image?.width,
                        height: location.featured_info?.image?.height,
                      }}
                      layout={ImageLayout.fill}
                      objectFit="cover"
                    />
                  ) : (
                    <NoImage>No featured image</NoImage>
                  )}

                  <LocationCardGroup>
                    <Heading3>
                      {location.location_names?.[locale] ?? location.post_title}
                    </Heading3>
                    <Chevron width={10.7} height={20} />
                  </LocationCardGroup>
                </LocationCard>
              </a>
            </Link>
          );
        })}
      </Column>
    </Section>
  );
};

export default LocationsMobile;
