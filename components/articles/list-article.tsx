import React from 'react';
import Link from 'next/link';

import { flattenBlocks } from '../../lib/utils';
import { SpacingValue } from '../../styles/Theme';
import { ContentBlock } from '../dynamic-module-generator';
import ListArticleImage from './list-article-image';
import { ArticleContainer, ListArticleDescription, ListArticleHeading } from './style';

type ListArticleProps = any;

const ListArticle = (props: ListArticleProps) => {
  const allBlocks = flattenBlocks(props.article.content.blocks);

  const firstParagraph = allBlocks.find(
    (block: ContentBlock) => block.blockName === 'sony/paragraph'
  );

  const description = String(firstParagraph?.children || '').replace(/\\n/g, '');
  const link =
    props.article.content.adjusted_permalink || props.article.content.permalink;

  return (
    <ArticleContainer>
      <Link href={link}>
        <a>
          <ListArticleImage {...props.article.content.featured_info?.image} />
          <ListArticleHeading>{props.article.content.post_title}</ListArticleHeading>
          <ListArticleDescription marginBottom={SpacingValue.none}>
            {description}
          </ListArticleDescription>
        </a>
      </Link>
    </ArticleContainer>
  );
};

export default ListArticle;
