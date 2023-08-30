import { GetStaticPropsContext } from 'next';
import { locales } from '../../lib/config';
import { sdk } from '../../lib/graphql/client';
import { ArticleProps } from '.';
import getWithRetries from '../../lib/graphql/get-with-retries';

export interface ArticleGetStaticPropsResult {
  revalidate: number;
  props: ArticleProps;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let slug =
    '/' + (Array.isArray(context.params?.slug) ? context?.params?.slug.join('/') : '');
  if (locales.length > 1) {
    const articlesRegexp = new RegExp(`\\/(${locales.join('|')})\\/articles\\/(\\w+)`);
    slug = slug.replace(articlesRegexp, '/articles/$1/$2');
  }

  const variables = {
    key: slug,
    target: context.preview ? 'draft' : 'live',
    siteId: String(process.env.NEXT_PUBLIC_CONTENT_SITE_ID),
  };

  const data = await getWithRetries('getResource', variables);

  const { tags, language } = data?.resource || {};

  const relatedArticlesVariables = {
    target: context.preview ? 'draft' : 'live',
    siteId: String(process.env.NEXT_PUBLIC_CONTENT_SITE_ID),
    tags: tags || [],
    languages: language ? [language] : [],
    filter: {
      permalink: {
        $not: slug,
      },
    },
  };

  const relatedRes = await getWithRetries('getRelatedArticles', relatedArticlesVariables);

  const relatedArticles = relatedRes.articles.map((article) => {
    if (!article.key) {
      throw new Error('no article key');
    }
    return {
      key: article.key,
      content: {
        featured_info: article.content.featured_info,
        post_title: article.content.post_title,
        adjusted_permalink: article.content.adjusted_permalink,
        description: '',
      },
      type: 'article',
    };
  });

  const returnValue: ArticleGetStaticPropsResult = {
    props: {
      article: data.resource?.content || null,
      relatedArticles,
    },
    revalidate: 60,
  };

  return returnValue;
};

export default getStaticProps;
