import React from 'react';
import {
  OuterWrapperProps,
  StyledSection,
  StyledSectionProps,
  StyledSectionWrapper,
} from './style';
import SectionContent, { SectionContentProps } from './section-content';
import { SpacingValue } from '../../styles/Theme';
import {
  GridOptionValue,
  RenderedSectionProps,
  SectionAttributes,
  SectionBackgroundProps,
  SectionContextType,
} from './types';
import SectionContext from './context';
import { getSectionTextColor } from './helpers';
import SectionBackground from './section-background';

/**
 *
 * @property {boolean} subgrid - When set to true, the StyledGridItem inherits the grid from it's parrent. Note: This only works when the grid template is set to 1 column
 *
 */

const Section = (props: RenderedSectionProps) => {
  const {
    gridOptions = {
      left: GridOptionValue.normal,
      right: GridOptionValue.normal,
    },
    marginBottom = SpacingValue.medium,
    marginTop = SpacingValue.medium,
    paddingBottom = SpacingValue.none,
    paddingTop = SpacingValue.none,
    backgroundType = 'transparent',
    backgroundValue,
    backgroundGridOptions = {
      left: GridOptionValue.normal,
      right: GridOptionValue.normal,
    },
    extendBackground,
    preloadImage,
    textColor,
    className,
    style,
    subgrid = false,
    visibility,
    anchorTarget,
  } = props;

  // this places the 'outer grid' with different columns for full/extended/normal grid
  const outerWrapperProps: OuterWrapperProps = {
    marginBottom,
    marginTop,
    paddingBottom,
    paddingTop,
    className,
    visibility,
    extendBackground,
  };

  // this places the 'inner grid', that spaces out content inside itself
  const sectionProps: StyledSectionProps = {
    gridOptions,
    zIndex: backgroundType === 'transparent' ? 'auto' : 1,
  };
  const sectionAttributes: SectionAttributes = {};
  if (props.anchorTarget) {
    sectionAttributes.id = props.anchorTarget;
  }

  const backgroundProps: SectionBackgroundProps = {
    backgroundType: backgroundType,
    backgroundValue: backgroundValue,
    gridOptions: backgroundGridOptions,
    preloadImage,
  };

  const contentProps: SectionContentProps = {
    ...props,
    subgrid,
  };

  const contextValue: SectionContextType = {
    backgroundType,
    backgroundValue,
    textColor: getSectionTextColor({ backgroundType, backgroundValue, textColor }),
  };

  return (
    <StyledSectionWrapper {...outerWrapperProps} style={style}>
      <SectionBackground {...backgroundProps} />

      <StyledSection {...sectionProps} {...sectionAttributes}>
        <SectionContext.Provider value={contextValue}>
          <SectionContent {...contentProps} />
        </SectionContext.Provider>
      </StyledSection>
    </StyledSectionWrapper>
  );
};

export default Section;
