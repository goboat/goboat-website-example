import React, { useEffect, useRef, useState } from 'react';
import Faq, { FaqProps } from '../faq/faq';
import { GridOptionValue, RenderedSectionProps } from '../section/types';
import { SpacingValue } from '../../styles/Theme';
import Column from '../section/column';
import SearchIcon from '../icons/search';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { SearchInputWrapper, SearchInput, FaqCollectionSection } from './style';
import { FaqContext } from './context';

interface FaqCollectionProps {
  faq_sections: FaqProps[];
}

const sectionProps: RenderedSectionProps = {
  template: [{ width: 6 }, { width: 6 }],
  marginBottom: SpacingValue.none,
  marginTop: SpacingValue.none,
  paddingBottom: SpacingValue.none,
  paddingTop: SpacingValue.none,
  gridOptions: {
    left: GridOptionValue.normal,
    right: GridOptionValue.normal,
  },
};

const FaqCollection = (props: FaqCollectionProps) => {
  const localize = useLocalize();
  // to control input
  const [searchString, setSearchString] = useState('');
  // debounced, to pass along to context
  const [searchValue, setSearchValue] = useState('');

  const timeoutRef = useRef(0);

  // debounce search value
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // debounce unless search string is empty (instant clear)
    if (searchString) {
      // use window.setTimeout for this reason: https://stackoverflow.com/questions/51040703/what-return-type-should-be-used-for-settimeout-in-typescript
      timeoutRef.current = window.setTimeout(() => {
        setSearchValue(searchString);
      }, 500);
    } else {
      setSearchValue(searchString);
    }
  }, [searchString]);

  const searchInputProps = {
    type: 'search',
    placeholder: localize(Localization.search),
    value: searchString,
    onChange: (event: any) => setSearchString(event.target.value),
  };

  return (
    <FaqContext.Provider value={{ searchString: searchValue }}>
      <FaqCollectionSection {...sectionProps}>
        <Column>
          <SearchInputWrapper>
            <SearchIcon />
            <SearchInput {...searchInputProps} />
          </SearchInputWrapper>
        </Column>
      </FaqCollectionSection>
      {props.faq_sections.map((faqSection) => {
        return <Faq {...faqSection} key={faqSection.hash} />;
      })}
    </FaqContext.Provider>
  );
};

export default FaqCollection;
