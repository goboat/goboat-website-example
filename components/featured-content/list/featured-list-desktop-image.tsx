import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ImageLayout } from '../../image/image';
import { NoImage } from '../cards/style';
import {
  FeaturedListDesktopImageContainer,
  FeaturedListDesktopImageCurrent,
  FeaturedListDesktopImagePast,
} from './style';
import { Entry } from '../types';

interface TipImageProps {
  tip: Entry;
}

const FeaturedListDesktopImage = ({ tip }: TipImageProps) => {
  const [current, setCurrent] = useState(tip);
  const [past, setPast] = useState(tip);

  useEffect(() => {
    if (tip.key !== current.key) {
      setPast(current);
      setCurrent(tip);
    }
  }, [tip, current]);

  if (!current.content.featured_info?.image || !past.content.featured_info?.image) {
    return <NoImage>No featured image</NoImage>;
  }

  return (
    <Link href={current.content.adjusted_permalink || current.key}>
      <a>
        <FeaturedListDesktopImageContainer>
          <FeaturedListDesktopImageCurrent
            image={current.content.featured_info.image}
            layout={ImageLayout.fill}
            objectFit="cover"
            altText={current.content.post_title}
            key={current.key}
          />

          <FeaturedListDesktopImagePast
            image={past.content.featured_info.image}
            layout={ImageLayout.fill}
            objectFit="cover"
            altText={past.content.post_title}
            key={`${past.key}-past`}
          />
        </FeaturedListDesktopImageContainer>
      </a>
    </Link>
  );
};

export default FeaturedListDesktopImage;
