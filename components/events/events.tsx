import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { locales, siteId } from '../../lib/config';
import { getFilter } from './utils';
import useLocale from '../../hooks/use-locale';
import { publicSdk } from '../../lib/graphql/client';
import { Event } from './types';
import Spinner from '../../sub-components/spinner';
import GeneralOptionsContext from '../../lib/general-options-context';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import ListEvent from './list-event';
import Section from '../section/section';
import { GridOptionValue, RenderedSectionProps } from '../section/types';
import { SpacingValue } from '../../styles/Theme';
import {
  LoadMoreButton,
  SpinnerContainer,
  CitySelector,
  SubGridContainer,
  EventsFilter,
  EventLink,
} from './style';
import { EventsQueryVariables } from '../../lib/graphql-sdk-content';

interface EventsBlockProps {
  events: {
    items: Event[];
  };
}

const PAGE_SIZE = 3;

const EventsSection = (props: EventsBlockProps) => {
  const locale = useLocale();
  const { query } = useRouter();

  const [filter, setFilter] = useState<'upcoming' | 'all'>('upcoming');
  const [events, setEvents] = useState(props.events.items);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const localize = useLocalize();
  const generalOptions = useContext(GeneralOptionsContext);
  const cities =
    generalOptions?.locations
      .map((location) => location?.content?.city)
      .filter(Boolean) || [];
  const uniqueCities = Array.from(new Set(cities));

  // tags parameter was not available at initial render, so could not use the initial value
  // in the setState hook
  useEffect(() => {
    const city = String(query.city || '');

    if (uniqueCities.includes(city) && selectedCities[0] !== city) {
      setSelectedCities([city]);
    }
  }, [query.city]); // eslint-disable-line

  // function to fetch more events
  const fetchMore = async () => {
    if (!loading && hasMoreEvents) {
      setLoading(true);
      const variables: EventsQueryVariables = {
        offset: currentPage * PAGE_SIZE,
        languages: locales.length > 1 ? [locale] : [],
        filter: getFilter(filter, selectedCities),
        siteId,
      };

      const data = await publicSdk.events(variables);

      // in case the events from live and build time are out of sync
      const newEvents = data?.events?.filter(
        (newEvent) => !events.some((existingEvent) => existingEvent.key === newEvent.key)
      );

      if (newEvents) {
        setLoading(false);

        setEvents([...events, ...newEvents]);
        setCurrentPage(currentPage + 1);

        if (newEvents?.length < PAGE_SIZE) {
          setHasMoreEvents(false);
        }
      }
    }
  };

  // hook to handle fetching when filtering
  useEffect(() => {
    setHasMoreEvents(true);
    setCurrentPage(1);

    const fetchEvents = async () => {
      setLoading(true);
      setEvents([]);

      const variables: EventsQueryVariables = {
        offset: 0,
        languages: locales.length > 1 ? [locale] : [],
        filter: getFilter(filter, selectedCities),
        siteId,
      };

      const data = await publicSdk.events(variables);

      setLoading(false);
      setEvents(data?.events || []);

      if (data?.events.length < PAGE_SIZE) {
        setHasMoreEvents(false);
      }
    };

    if (filter === 'all' || selectedCities.length > 0) {
      fetchEvents();
    } else {
      setEvents(props.events.items);
    }
  }, [props.events.items, filter, locale, selectedCities]);

  const sectionProps: RenderedSectionProps = {
    template: [{ width: '1/1' }],
    marginBottom: SpacingValue.medium,
    marginTop: SpacingValue.medium,
    paddingBottom: SpacingValue.none,
    paddingTop: SpacingValue.none,
    gridOptions: {
      left: GridOptionValue.normal,
      right: GridOptionValue.normal,
    },
    subgrid: true,
  };

  return (
    <Section {...sectionProps}>
      <SubGridContainer>
        {uniqueCities.length > 1 ? (
          <CitySelector
            tags={uniqueCities.map((city) => ({ slug: city, name: city }))}
            selectedTags={selectedCities}
            setSelectedTags={setSelectedCities}
            mode="single"
            disabled={loading}
          />
        ) : null}

        <EventsFilter filter={filter} setFilter={setFilter} loading={loading} />

        {events?.map((event) => (
          <Link
            href={event.content.adjusted_permalink || event.key}
            passHref
            key={event.key}
          >
            <EventLink>
              <ListEvent event={event} />
            </EventLink>
          </Link>
        ))}

        {loading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : null}

        {hasMoreEvents && !loading ? (
          <LoadMoreButton type="button" onClick={() => fetchMore()}>
            {localize(Localization.loadMore)}
          </LoadMoreButton>
        ) : (
          ''
        )}
      </SubGridContainer>
    </Section>
  );
};

export default EventsSection;
