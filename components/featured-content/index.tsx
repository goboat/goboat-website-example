import React from 'react';
import FeaturedCards from './cards/featured-cards';
import FeaturedList from './list/featured-list';
import FeaturedCarousel from './carousel';
import FeaturedArticles from './articles/featured-articles';
import SectionContext from '../section/context';
import { useTheme } from 'styled-components';
import {
  FeaturedContentContextType,
  FeaturedContentProps,
  FeaturedContentType,
  RawFeaturedContentProps,
} from './types';
import {
  assertEntryHasNoError,
  getBackgroundStyle,
  getFeaturedContentTextColor,
} from './helpers';

const components: Record<FeaturedContentType, Function> = {
  cards: FeaturedCards,
  list: FeaturedList,
  carousel: FeaturedCarousel,
  articles: FeaturedArticles,
};

const FeaturedContent = (props: RawFeaturedContentProps) => {
  const { type, backgroundType = 'transparent', backgroundValue } = props;
  const theme = useTheme();

  let conponentType = type;

  if (!conponentType) conponentType = FeaturedContentType.cards;

  const Component = components[conponentType];

  const filteredEntries = props.entries.filter(assertEntryHasNoError);
  const componentProps: FeaturedContentProps = {
    ...props,
    entries: filteredEntries,
    backgroundStyle: getBackgroundStyle(backgroundType, backgroundValue, theme),
  };

  if (filteredEntries.length === 0) {
    return null;
  }

  const contextValue: FeaturedContentContextType = {
    backgroundType,
    backgroundValue,
    textColor: getFeaturedContentTextColor({ backgroundType, backgroundValue }),
  };

  return (
    <SectionContext.Provider value={contextValue}>
      <Component {...componentProps} />
    </SectionContext.Provider>
  );
};

export default FeaturedContent;
