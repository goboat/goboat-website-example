import Link from 'next/link';

import { Card, EntryTitle, TextWrapper } from './style';
import { SmallText, TextColor } from '../../../sub-components/Text';
import FeaturedCardsImage from './featured-cards-image';
import useLocalize from '../../../hooks/use-localize';
import { Localization } from '../../../lib/localizations';
import { Entry } from '../types';

interface FeaturedContentEntryProps {
  entry: Entry;
  disabled: boolean;
}

const FeaturedCardsEntry = (props: FeaturedContentEntryProps) => {
  const { entry, disabled } = props;
  const localize = useLocalize();

  const src = entry?.content?.featured_info?.image?.url;
  const blurDataURL = entry?.content?.featured_info?.image?.blurDataURL;
  const tags = entry?.content?.tags;

  return (
    <Card disabled={disabled}>
      <Link href={entry.content.adjusted_permalink || entry.key}>
        <a>
          <FeaturedCardsImage
            src={src}
            blurDataURL={blurDataURL}
            text={localize(Localization.readMore)}
            disabled={disabled}
          />

          <TextWrapper>
            <EntryTitle>{entry.content.post_title}</EntryTitle>
            <SmallText
              color={TextColor.secondary}
              style={{ margin: 0, textTransform: 'capitalize', display: 'inline' }}
            >
              {entry.type}
              {(tags?.length ?? 0) > 0 && ` / ${tags?.join(', ')}`}
            </SmallText>
          </TextWrapper>
        </a>
      </Link>
    </Card>
  );
};

export default FeaturedCardsEntry;
