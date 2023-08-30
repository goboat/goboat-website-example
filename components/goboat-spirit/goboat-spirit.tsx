import React from 'react';

import { ImageProps } from '../image/image';
import OnlyDesktop from '../only-desktop';
import OnlyMobile from '../only-mobile';
import GoBoatSpiritDesktop from './desktop';
import GoBoatSpiritMobile from './mobile';

export type GoBoatSpiritProps = {
  heading: string;
  paragraph: string;
  images: ImageProps[];
  videoURL: string;
};

const GoBoatSpirit = (props: GoBoatSpiritProps) => {
  return (
    <>
      <OnlyMobile>
        <GoBoatSpiritMobile {...props} />
      </OnlyMobile>

      <OnlyDesktop>
        <GoBoatSpiritDesktop {...props} />
      </OnlyDesktop>
    </>
  );
};

export default GoBoatSpirit;
