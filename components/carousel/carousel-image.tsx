import React from 'react';
import styled from 'styled-components';

import { SpacingValue } from '../../styles/Theme';
import { Heading3 } from '../../sub-components/Text';
import Image, { ImageLayout, ImageProps } from '../image/image';
import OnlyMobile from '../only-mobile';

interface SlideProps {
  isSelected: boolean;
}

const EmblaSlide = styled.div<SlideProps>`
  position: relative;
  opacity: ${(props) => (props.isSelected ? '1' : '0.7')};
  transition: opacity 0.5s ease;
  min-width: 100%;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding-left: 25px;
    min-width: 65%;
  }
`;

const EmblaSlideInner = styled.div`
  position: relative;
  overflow: hidden;
  height: 300px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 37.5vw;
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 ${(props) => props.theme.grid.mobile.outerMargin}px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0;
  }
`;

interface CarouselImageProps {
  image: ImageProps;
  position: number;
  total: number;
  isSelected: boolean;
}

const CarouselImage = (props: CarouselImageProps) => {
  const { position, total, isSelected } = props;

  const imageProps: ImageProps = {
    ...props.image,
    layout: ImageLayout.fill,
    objectFit: 'cover',
  };

  return (
    <EmblaSlide isSelected={isSelected}>
      <EmblaSlideInner>
        <Image {...imageProps} />
      </EmblaSlideInner>

      <FlexRow>
        <Heading3 marginTop={SpacingValue.small} marginBottom={SpacingValue.small}>
          {props.image.imageText}
        </Heading3>

        <OnlyMobile>
          <Heading3 marginTop={SpacingValue.small} marginBottom={SpacingValue.none}>
            {position}/{total}
          </Heading3>
        </OnlyMobile>
      </FlexRow>
    </EmblaSlide>
  );
};

export default CarouselImage;
