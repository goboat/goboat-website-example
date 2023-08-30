import { useContext } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { getStaticProps } from './get-static-props';
import DynamicModuleGenerator, {
  ContentBlock,
} from '../../components/dynamic-module-generator';
import HeadStructure, { YoastSEOData } from '../../components/head/Head';
import PageHeader from '../../components/page-header/header';
import { SpacingValue } from '../../styles/Theme';
import Section from '../../components/section/section';
import EventDetails from './event-details';
import EventButtons from './event-buttons';
import EventDirections from './event-directions';
import SleeknoteForm from '../../sub-components/sleeknote-form';
import RelatedContent from '../../components/related-content';
import GeneralOptionsContext from '../../lib/general-options-context';
import useLocale from '../../hooks/use-locale';
import { GridOptionValue } from '../../components/section/types';
import Column from '../../components/section/column';
import EventLocations from './event-locations';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import NotFound from '../not-found';
import StopPreview from '../../components/StopPreview';

export interface Event {
  category: string;
  description: string;
  featured_info: {
    image: {
      __isimage: boolean;
      url: string;
      blurDataURL: string;
      width: number;
      height: number;
      caption?: string;
    };
  };
  id: number;
  post_title: string;
  date: {
    day: string;
    time: string;
  };
  address: string;
  location: {
    __reference: string;
    id: number;
    post_title: string;
    permalink: string;
    guid: string;
    city: string;
    location_names: Record<string, string>;
  };
  adjusted_permalink: string;
  seo: YoastSEOData;
  blocks: ContentBlock[];
  language: string;
  coordinates?: string;
  sign_up_link: {
    url: string;
  };
  maps_link?: {
    url: string;
  };
  google_calendar_link?: string;
  ics_calendar_link?: string;
}

export interface RelatedEvent {
  key: string;
  content: Pick<
    Event,
    'featured_info' | 'post_title' | 'adjusted_permalink' | 'description'
  >;
  type: string;
}

export interface EventProps {
  event?: Event;
  relatedEvents?: RelatedEvent[];
}

const Event: NextPage<EventProps> = (props) => {
  const router = useRouter();
  const localize = useLocalize();
  const { event, relatedEvents } = props;

  const featuredImage = event?.featured_info?.image;

  const generalOptions = useContext(GeneralOptionsContext);
  const locale = useLocale();

  if (!event) return <NotFound />;

  const sleeknoteId = generalOptions?.eventsSleeknote?.[locale];

  // Slice off the last /
  const eventsPath = generalOptions?.eventsPages[locale]?.slice(0, -1);

  const otherLocations = generalOptions?.locations
    .filter((location) => {
      if (!eventsPath) return false;
      if (!location.content.city) return false;

      const city = location.content.city;
      const currentCity = event.location.city;

      if (city === currentCity) return false;

      return true;
    })
    .map((location) => {
      return {
        city: location.content.city,
        url: `${eventsPath}?city=${location.content.city}`,
      };
    });

  return (
    <>
      <HeadStructure seoData={event.seo} />
      {router.isPreview && <StopPreview />}

      <PageHeader
        heading={event.post_title}
        image={{
          url: featuredImage?.url,
          blurDataURL: featuredImage?.blurDataURL,
        }}
        sourceText={featuredImage?.caption}
      />

      <EventDetails
        location={event.location?.location_names?.[locale] ?? event.location?.post_title}
        date={event.date.day}
        time={event.date.time}
        address={event.address}
        signUpLink={event.sign_up_link.url}
      />

      <DynamicModuleGenerator content={event} />

      <EventButtons
        links={{
          google: event.google_calendar_link,
          ical: event.ics_calendar_link,
          signUp: event.sign_up_link.url,
        }}
      />

      <EventDirections
        location={event.location?.location_names?.[locale] ?? event.location?.post_title}
        address={event.address}
        mapLink={event.maps_link?.url}
        coordinates={event.coordinates}
      />

      <Section
        template={[{ width: '1/1' }]}
        marginTop={SpacingValue.none}
        marginBottom={SpacingValue.none}
        paddingTop={SpacingValue.none}
        paddingBottom={SpacingValue.none}
        gridOptions={{ left: GridOptionValue.normal, right: GridOptionValue.normal }}
        style={{ marginBottom: sleeknoteId ? '128px' : 0 }}
      >
        <Column>
          <SleeknoteForm formId={sleeknoteId} />
        </Column>
      </Section>

      <RelatedContent
        heading={localize(Localization.relatedEvents)}
        entries={relatedEvents}
      />

      <EventLocations locations={otherLocations} />
    </>
  );
};

const eventPage = {
  Component: Event,
  getStaticProps,
};

export default eventPage;
