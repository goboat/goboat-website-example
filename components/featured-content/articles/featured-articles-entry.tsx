import Link from 'next/link';

import { ArticleMeta, ArticleTitle, Card, TextWrapper } from './style';
import { Text, TextColor } from '../../../sub-components/Text';
import FeaturedArticlesImage from './featured-articles-image';
import OnlyDesktop from '../../only-desktop';
import useLocalize from '../../../hooks/use-localize';
import { Localization } from '../../../lib/localizations';
import { Entry } from '../types';

interface FeaturedContentEntryProps {
  entry: Entry;
  disabled: boolean;
}

const FeaturedArticlesEntry = (props: FeaturedContentEntryProps) => {
  const { entry, disabled } = props;
  const localize = useLocalize();

  const title = entry.overwrites?.title ?? entry.content.post_title;
  const src = entry?.content?.featured_info?.image?.url;
  const blurDataURL = entry?.content?.featured_info?.image?.blurDataURL;
  const tags = entry?.content?.tags;
  const date = entry?.content?.date_published
    ? new Date(entry.content.date_published).toLocaleDateString()
    : '';

  return (
    <Card disabled={disabled}>
      <Link href={entry.content.adjusted_permalink || entry.key}>
        <a>
          <FeaturedArticlesImage
            src={src}
            blurDataURL={blurDataURL}
            text={localize(Localization.readMore)}
            link={entry.key}
            disabled={disabled}
          />

          <TextWrapper>
            <ArticleTitle>{title}</ArticleTitle>

            <ArticleMeta>
              {date}
              {(tags?.length ?? 0) > 0 && ` / ${tags?.join(', ')}`}
            </ArticleMeta>

            <OnlyDesktop>
              <Text color={TextColor.secondary} style={{ margin: 0 }}>
                {entry.overwrites?.teaser}
              </Text>
            </OnlyDesktop>
          </TextWrapper>
        </a>
      </Link>
    </Card>
  );
};

export default FeaturedArticlesEntry;
