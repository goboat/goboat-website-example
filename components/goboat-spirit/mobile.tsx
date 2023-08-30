import React from 'react';
import MobileCarousel from './mobile-carousel';
import Column from '../section/column';
import { GoBoatSpiritProps } from './goboat-spirit';

const GoBoatSpiritMobile = (props: GoBoatSpiritProps) => {
  return (
    <Column>
      <MobileCarousel images={props.images} heading={props.heading} />
    </Column>
  );
};

export default GoBoatSpiritMobile;
