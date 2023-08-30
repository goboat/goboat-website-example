import Link from 'next/link';

import {
  Card,
  RelatedContentDescription,
  RelatedContentTitle,
  TextWrapper,
} from './style';
import { TextColor } from '../../sub-components/Text';
import RelatedContentImage from './related-content-image';
import { RelatedArticle } from '../../goboat-pages/article';
import { RelatedEvent } from '../../goboat-pages/event/event';

interface FeaturedContentEntryProps {
  entry: RelatedArticle | RelatedEvent;
  disabled: boolean;
}

const RelatedContentEntry = (props: FeaturedContentEntryProps) => {
  const { entry, disabled } = props;

  const title = entry.content.post_title;
  const description = entry.content.description;
  const src = entry?.content?.featured_info?.image?.url;
  const blurDataURL = entry?.content?.featured_info?.image?.blurDataURL;

  return (
    <Card disabled={disabled}>
      <Link href={entry.content.adjusted_permalink || entry.key}>
        <a>
          <RelatedContentImage src={src} blurDataURL={blurDataURL} disabled={disabled} />

          <TextWrapper>
            <RelatedContentTitle>{title}</RelatedContentTitle>

            <RelatedContentDescription color={TextColor.secondary}>
              {description}
            </RelatedContentDescription>
          </TextWrapper>
        </a>
      </Link>
    </Card>
  );
};

export default RelatedContentEntry;
