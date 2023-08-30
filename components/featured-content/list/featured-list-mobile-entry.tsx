import Link from 'next/link';
import { ImageLayout } from '../../image/image';
import { NoImage } from '../cards/style';
import {
  FeaturedListMobileEntryContainer,
  FeaturedListMobileEntryImage,
  FeaturedListMobileEntryOverlay,
  FeaturedListMobileEntryTitle,
} from './style';
import { Entry } from '../types';

interface FeaturedListMobileEntryProps {
  tip: Entry;
}

const EntryImage = ({ tip }: FeaturedListMobileEntryProps) => {
  if (!tip.content.featured_info?.image) return <NoImage>No featured image</NoImage>;

  return (
    <FeaturedListMobileEntryImage
      image={tip.content.featured_info.image}
      layout={ImageLayout.fill}
      objectFit="cover"
      altText={tip.content.post_title}
      key={tip.key}
    />
  );
};

const FeaturedListMobileEntry = ({ tip }: FeaturedListMobileEntryProps) => {
  return (
    <Link href={tip.content.adjusted_permalink || tip.key}>
      <a>
        <FeaturedListMobileEntryContainer>
          <FeaturedListMobileEntryOverlay />

          <FeaturedListMobileEntryTitle>
            {tip.content.post_title}
          </FeaturedListMobileEntryTitle>

          <EntryImage tip={tip} />
        </FeaturedListMobileEntryContainer>
      </a>
    </Link>
  );
};

export default FeaturedListMobileEntry;
