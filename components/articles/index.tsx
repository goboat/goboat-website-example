import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useLocale from '../../hooks/use-locale';
import useLocalize from '../../hooks/use-localize';
import { locales, siteId } from '../../lib/config';
import GeneralOptionsContext from '../../lib/general-options-context';
import { publicSdk } from '../../lib/graphql/client';
import { SpacingValue } from '../../styles/Theme';
import Spinner from '../../sub-components/spinner';
import { Text } from '../../sub-components/Text';
import SelectedTags from '../../sub-components/selected-tags';
import ListArticle from './list-article';
import {
  ArticlesContainer,
  CenterContainer,
  LoadMoreButton,
  SpinnerContainer,
} from './style';
import { Localization } from '../../lib/localizations';
import { ArticlesQuery, ArticlesQueryVariables } from '../../lib/graphql-sdk-content';

const PAGE_SIZE = 9;

export interface Article {
  key: string;
  content: {
    tags: string[];
  };
}

interface ArticlesBlockProps {
  articles: {
    items: ArticlesQuery['articles'];
  };
}

const ArticlesBlock = (props: ArticlesBlockProps) => {
  const { query } = useRouter();

  const [articles, setArticles] = useState(props.articles.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxedOut, setMaxedOut] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const locale = useLocale();
  const localize = useLocalize();

  const generalOptions = useContext(GeneralOptionsContext);

  const tags = generalOptions?.articleTags || [];

  // tags parameter was not available at initial render, so could not use the initial value
  // in the setState hook
  useEffect(() => {
    const asArray = String(query.tags || '')
      .split(',')
      .filter(Boolean);
    if (asArray.length > 0) {
      setSelectedTags(asArray);
    }
  }, [query.tags]);

  // function to fetch the 'next page'
  const fetchMore = async () => {
    if (!loading && !maxedOut) {
      setLoading(true);
      const variables: ArticlesQueryVariables = {
        offset: currentPage * PAGE_SIZE,
        languages: locales.length > 1 ? [locale] : [],
        tags: selectedTags,
        pageSize: PAGE_SIZE,
        siteId,
      };

      const data = await publicSdk.articles(variables);

      // in case the articles from live and build time are out of sync
      const newArticles = data?.articles?.filter(
        (newArticle) =>
          !articles.some((existingArticle) => existingArticle.key === newArticle.key)
      );

      if (newArticles) {
        setLoading(false);

        setArticles([...articles, ...newArticles]);
        setCurrentPage(currentPage + 1);

        if (newArticles?.length < PAGE_SIZE) {
          setMaxedOut(true);
        }
      }
    }
  };

  // effect to handle selecting/deselecting tags
  useEffect(() => {
    setMaxedOut(false);
    setCurrentPage(1);

    const fetchWhenSelectTag = async () => {
      setLoading(true);

      const variables: ArticlesQueryVariables = {
        offset: 0,
        languages: locales.length > 1 ? [locale] : [],
        tags: selectedTags,
        pageSize: PAGE_SIZE,
        siteId,
      };

      const data = await publicSdk.articles(variables);

      setLoading(false);
      setArticles(data?.articles || []);

      if (data?.articles?.length < PAGE_SIZE) {
        setMaxedOut(true);
      }
    };

    if (selectedTags.length > 0) {
      setArticles((articles) => {
        return articles.filter((article) =>
          article.content.tags.some((tag: string) => selectedTags.includes(tag))
        );
      });
      fetchWhenSelectTag();
    } else {
      // if no tags selected, use default set of articles
      setArticles(props.articles.items);
    }
  }, [selectedTags, props.articles.items, locale]);

  const loadMoreButtonProps = {
    onClick: () => fetchMore(),
    disabled: loading || maxedOut,
  };

  const tagsProps = {
    tags,
    selectedTags,
    setSelectedTags,
  };

  return (
    <>
      <SelectedTags {...tagsProps} />
      <ArticlesContainer>
        {articles.map((article) => {
          return <ListArticle article={article} key={article.key} />;
        })}
      </ArticlesContainer>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : null}
      <CenterContainer>
        {!maxedOut && !loading ? (
          <LoadMoreButton {...loadMoreButtonProps}>
            <Text margin={SpacingValue.none}>{localize(Localization.loadMore)}</Text>
          </LoadMoreButton>
        ) : null}
      </CenterContainer>
    </>
  );
};

export default ArticlesBlock;
