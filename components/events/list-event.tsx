import React from 'react';

import { ImageLayout, ImageProps } from '../image/image';
import type { Event } from './types';
import { formatDate, truncateDescription } from './utils';
import {
  EventCategory,
  EventDate,
  EventAddress,
  EventDescription,
  EventImageWrapper,
  EventTitle,
  ListEventContainer,
  EventTime,
  ImageOverlay,
  EventArrow,
  EventImage,
} from './style';

interface ListEventProps {
  event: Event;
}

const ListEvent = (props: ListEventProps) => {
  const { event } = props;

  const imageProps: ImageProps = {
    image: {
      ...event.content.featured_info.image,
      url: event.content.featured_info.image.url,
    },
    layout: ImageLayout.fill,
    objectFit: 'cover',
  };

  return (
    <ListEventContainer>
      <EventCategory>{event.content.category}</EventCategory>
      <EventTime>{event.content.date.time}</EventTime>
      <EventDate>{formatDate(event.content.date.day)}</EventDate>
      <EventImageWrapper>
        <ImageOverlay />
        <EventImage {...imageProps} />
      </EventImageWrapper>
      <EventAddress>{event.content.address}</EventAddress>
      <EventTitle>{event.content.post_title}</EventTitle>
      <EventDescription>
        {truncateDescription(event.content.description)}
      </EventDescription>
      <EventArrow />
    </ListEventContainer>
  );
};

export default ListEvent;
