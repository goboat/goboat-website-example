import { GetStaticPropsContext } from 'next';

import { GetStaticProps } from 'next';

import { getFilter } from '../../components/events/utils';
import { locales } from '../../lib/config';
import { EventProps } from './event';
import getWithRetries from '../../lib/graphql/get-with-retries';
import { GetRelatedEventsQueryVariables } from '../../lib/graphql-sdk-content';

interface EventGetStaticPropsResult {
  revalidate: number;
  props: EventProps;
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  let slug =
    '/' + (Array.isArray(context.params?.slug) ? context?.params?.slug.join('/') : '');

  if (locales.length > 1) {
    const eventsRegexp = new RegExp(`\\/(${locales.join('|')})\\/events\\/(\\w+)`);
    slug = slug.replace(eventsRegexp, '/events/$1/$2');
  }

  const variables = {
    key: slug,
    target: context.preview ? 'draft' : 'live',
    siteId: String(process.env.NEXT_PUBLIC_CONTENT_SITE_ID),
  };

  const data = await getWithRetries('getResource', variables);

  const { location, language } = data.resource?.content;

  const relatedVariables: GetRelatedEventsQueryVariables = {
    siteId: String(process.env.NEXT_PUBLIC_CONTENT_SITE_ID),
    target: context.preview ? 'draft' : 'live',
    languages: language ? [language] : [],
    filter: {
      ...getFilter('all', [location.city]),
      permalink: {
        $not: slug,
      },
    },
  };

  const relatedData = await getWithRetries('getRelatedEvents', relatedVariables);

  const relatedEvents = relatedData.events.map((event) => {
    if (!event.key) {
      throw new Error('no event key');
    }
    return {
      key: event.key,
      content: {
        featured_info: event.content.featured_info,
        post_title: event.content.post_title,
        adjusted_permalink: event.content.adjusted_permalink,
        description: event.content.description,
      },
      type: 'event',
    };
  });

  const returnValue: EventGetStaticPropsResult = {
    props: {
      event: data.resource?.content ?? null,
      relatedEvents,
    },
    revalidate: 60,
  };

  return returnValue;
};
