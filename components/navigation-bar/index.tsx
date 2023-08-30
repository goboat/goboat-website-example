import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useTheme } from 'styled-components';

import useBookingLink from '../../hooks/use-booking-link';
import useFrontPageLink from '../../hooks/use-front-page-link';
import useLocale from '../../hooks/use-locale';
import useLocalize from '../../hooks/use-localize';
import GeneralOptionsContext, {
  GeneralOptionsType,
} from '../../lib/general-options-context';
import { Localization } from '../../lib/localizations';
import { SpacingValue } from '../../styles/Theme';
import { GridOptionValue, RenderedSectionProps } from '../section/types';
import {
  NavigationBarContainer,
  NavigationBarWrapper,
  NavigationBarWrapperMobile,
  LocationSelector,
} from './style';
import OnlyDesktop from '../only-desktop';
import OnlyMobile from '../only-mobile';
import BookLink from './book-link';
import Select from '../../sub-components/select';

interface NavigationBarProps {
  defaultLocation: {
    id: number;
  };
}

const NavigationBar = (props: NavigationBarProps) => {
  const { defaultLocation } = props;
  const locale = useLocale();
  const router = useRouter();
  const { locations, translations }: GeneralOptionsType =
    useContext(GeneralOptionsContext);
  const bookingLink = useBookingLink();
  const localize = useLocalize();
  const theme = useTheme();
  const { frontPageLink } = useFrontPageLink();

  if (theme.name === 'GOBOAT_EXCLUSIVE') {
    return null;
  }

  const goToLocation = (e: { target: { value: string } }) => {
    const location = locations?.find(
      (location) => location?.content?.id === Number(e.target.value)
    );

    const locationPage = location?.content?.pages?.[locale] ?? frontPageLink;
    router.push(locationPage);
  };

  const sectionProps: RenderedSectionProps = {
    template: [{ width: '1/1' }],
    marginBottom: SpacingValue.medium,
    marginTop: SpacingValue.medium,
    paddingBottom: SpacingValue.none,
    paddingTop: SpacingValue.none,
    gridOptions: {
      left: GridOptionValue.normal,
      right: GridOptionValue.extended,
    },
    subgrid: true,
  };

  const sectionPropsMobile: RenderedSectionProps = {
    template: [{ width: '1/1' }],
    marginBottom: SpacingValue.medium,
    marginTop: SpacingValue.medium,
    paddingBottom: SpacingValue.none,
    paddingTop: SpacingValue.none,
    gridOptions: {
      left: GridOptionValue.normal,
      right: GridOptionValue.full,
    },
    subgrid: true,
  };

  const buttonText =
    translations?.menu_book_button[locale] ?? localize(Localization.book);
  const buttonTextMobile =
    translations?.menu_book_button_mobile[locale] ?? localize(Localization.book);

  return (
    <>
      <OnlyDesktop>
        <NavigationBarContainer {...sectionProps}>
          <>
            <NavigationBarWrapper />

            <LocationSelector>
              <Select
                name="locations"
                value={defaultLocation ? defaultLocation?.id : 'default'}
                onChange={goToLocation}
              >
                {!defaultLocation ? (
                  <option value="default" disabled>
                    {translations?.['location_chooser']?.[locale] || 'Choose location'}
                  </option>
                ) : null}
                {locations?.map((location) => (
                  <option value={location?.content?.id} key={location?.content?.id}>
                    {location?.content?.location_names?.[locale] ??
                      location?.content?.post_title}
                  </option>
                ))}
              </Select>
            </LocationSelector>

            <BookLink
              bookingLink={bookingLink}
              buttonText={buttonText}
              arrowSize={16}
              gap={16}
            />
          </>
        </NavigationBarContainer>
      </OnlyDesktop>

      <OnlyMobile>
        <NavigationBarContainer {...sectionPropsMobile}>
          <NavigationBarWrapperMobile>
            <LocationSelector>
              <Select
                name="locations"
                value={defaultLocation ? defaultLocation?.id : 'default'}
                onChange={goToLocation}
                arrowWidth={13.75}
                arrowHeight={7.25}
              >
                {!defaultLocation ? (
                  <option value="default" disabled>
                    {translations?.['location_chooser']?.[locale] || 'Choose location'}
                  </option>
                ) : null}
                {locations?.map((location) => (
                  <option value={location?.content?.id} key={location?.content?.id}>
                    {location?.content?.location_names?.[locale] ??
                      location?.content?.post_title}
                  </option>
                ))}
              </Select>
            </LocationSelector>

            <BookLink
              bookingLink={bookingLink}
              buttonText={buttonTextMobile}
              arrowSize={12}
              gap={8}
            />
          </NavigationBarWrapperMobile>
        </NavigationBarContainer>
      </OnlyMobile>
    </>
  );
};

export default NavigationBar;
