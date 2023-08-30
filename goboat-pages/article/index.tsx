import { useContext } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

import getStaticProps from './get-static-props';
import DynamicModuleGenerator, {
  ContentBlock,
} from '../../components/dynamic-module-generator';
import HeadStructure, { YoastSEOData } from '../../components/head/Head';
import StopPreview from '../../components/StopPreview';
import GeneralOptionsContext from '../../lib/general-options-context';
import useLocale from '../../hooks/use-locale';
import ArticleHeader from './article-header';
import NotFound from '../not-found';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import SleeknoteForm from '../../sub-components/sleeknote-form';
import RelatedContent from '../../components/related-content';

export interface Article {
  seo: YoastSEOData;
  post_title: string;
  blocks: ContentBlock[];
  tags: string[];
  date_modified: string;
  author: string;
  author_avatar?: string;
  adjusted_permalink: string;
  featured_info: {
    image?: {
      url: string;
      blurDataURL: string;
      width: number;
      height: number;
      caption?: string;
    };
  };
  description: string;
}

export interface RelatedArticle {
  key: string;
  content: Pick<
    Article,
    'featured_info' | 'post_title' | 'adjusted_permalink' | 'description'
  >;
  type: string;
}

export interface ArticleProps {
  article?: Article;
  relatedArticles?: RelatedArticle[];
}

const Article: NextPage<ArticleProps> = (props) => {
  const router = useRouter();
  const { article } = props;
  const generalOptions = useContext(GeneralOptionsContext);
  const locale = useLocale();
  const localize = useLocalize();

  const sleeknoteId = generalOptions?.articlesSleeknote?.[locale];

  if (!article) return <NotFound />;

  return (
    <>
      <HeadStructure seoData={article.seo} />
      {router.isPreview && <StopPreview />}

      <ArticleHeader article={article} />

      <DynamicModuleGenerator content={article} />

      <SleeknoteForm formId={sleeknoteId} />

      <RelatedContent
        heading={localize(Localization.relatedArticles)}
        entries={props.relatedArticles}
      />
    </>
  );
};

const articlePage = {
  Component: Article,
  getStaticProps,
};

export default articlePage;
