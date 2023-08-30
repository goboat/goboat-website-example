import React, { useContext } from 'react';

import Section from '../../components/section/section';
import { GridOptionValue, RenderedSectionProps } from '../../components/section/types';
import type { Article } from './';
import { SpacingValue } from '../../styles/Theme';
import { Link } from '../../sub-components/Text';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import useLocale from '../../hooks/use-locale';
import GeneralOptionsContext from '../../lib/general-options-context';
import ArticleAuthorImage from './article-author-image';
import { ArticleAuthor, ArticleDate, ArticleTag, TagsContainer } from './style';
import Column from '../../components/section/column';
import PageHeader from '../../components/page-header/header';

interface ArticleHeaderProps {
  article: Article;
}

const commonSectionProps: Omit<RenderedSectionProps, 'template'> = {
  marginTop: SpacingValue.none,
  marginBottom: SpacingValue.none,
  paddingTop: SpacingValue.none,
  paddingBottom: SpacingValue.none,
  gridOptions: {
    left: GridOptionValue.normal,
    right: GridOptionValue.normal,
  },
};

const infoSectionProps: RenderedSectionProps = {
  ...commonSectionProps,
  subgrid: true,
  template: [{ width: 12 }],
};

const ArticleHeader = (props: ArticleHeaderProps) => {
  const { article } = props;
  const localize = useLocalize();
  const locale = useLocale();

  const general = useContext(GeneralOptionsContext);

  const headerImageProps = {
    image: article.featured_info.image,
  };

  return (
    <>
      <PageHeader
        heading={article.post_title}
        image={{
          url: article.featured_info.image?.url,
          blurDataURL: article.featured_info.image?.blurDataURL,
        }}
        sourceText={article.featured_info.image?.caption}
      />

      <Section {...infoSectionProps}>
        <Column>
          <ArticleAuthorImage src={article.author_avatar} />
          <ArticleAuthor>
            By <strong>{article.author}</strong>
          </ArticleAuthor>
          <ArticleDate>
            {localize(Localization.lastUpdated)}
            &nbsp;
            <strong>
              {new Date(article.date_modified).toLocaleDateString(locale, {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              })}
            </strong>
          </ArticleDate>
          <TagsContainer>
            {article.tags.map((tag) => {
              return (
                <Link
                  key={tag}
                  href={`${general?.articlesPages?.[locale] || '/articles'}?tags=${tag}`}
                >
                  <ArticleTag key={tag}>{tag}</ArticleTag>
                </Link>
              );
            })}
          </TagsContainer>
        </Column>
      </Section>
    </>
  );
};

export default ArticleHeader;
