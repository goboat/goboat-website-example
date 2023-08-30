import { EventsQuery } from '../../lib/graphql-sdk-content';

interface EventContent {
  category?: string;
  description?: string;
  featured_info: {
    image?: {
      __isimage: boolean;
      src: string;
      width: number;
      height: number;
    };
  };
  id: number;
  post_title: string;
  date?: {
    day: string;
    time: string;
  };
  address?: string;
  location?: {
    __reference: string;
    id: number;
    post_title: string;
    permalink: string;
    guid: string;
  };
  adjusted_permalink: string;
}

export type Event = EventsQuery['events'][0] & {
  content?: EventContent;
};
