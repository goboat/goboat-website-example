import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from 'embla-carousel-react';

import { Heading1, Text } from '../../sub-components/Text';
import DesktopCarousel from './desktop-carousel';
import { videoHost } from '../../lib/config';
import Section from '../section/section';
import { GridOptionValue, RenderedSectionProps } from '../section/types';
import { GoBoatSpiritProps } from './goboat-spirit';
import { SpacingValue } from '../../styles/Theme';
import { getCleanMediaUrl } from '../../lib/utils';
import useCarousel from '../../hooks/use-carousel';
import {
  BottomColumn,
  BottomRow,
  Grid,
  MessageWrapper,
  StyledInspirationalMessage,
  StyledVideo,
  TopColumn,
  TopRow,
} from './style';

const outerSectionProps = {
  template: [
    {
      width: '1/1',
    },
  ],
  blockName: 'next24hr/section',
  marginTop: SpacingValue.none,
  marginBottom: SpacingValue.none,
  paddingTop: SpacingValue.none,
  paddingBottom: SpacingValue.none,
  gridOptions: {
    left: GridOptionValue.full,
    right: GridOptionValue.full,
  },
};

const carouselOptions: EmblaOptionsType = {
  loop: true,
  draggable: false,
  skipSnaps: false,
};

const autoplayOptions = { delay: 4000, stopOnInteraction: false };
const autoplay = Autoplay(autoplayOptions);

const GoBoatSpiritDesktop = (props: GoBoatSpiritProps) => {
  const outerProps: RenderedSectionProps = outerSectionProps;
  const { viewportRef, selectedSlide } = useCarousel(carouselOptions, [autoplay]);

  const videoSrc = `${videoHost}${getCleanMediaUrl(props.videoURL)}`;

  return (
    <Section {...outerProps} subgrid>
      <Grid>
        <TopRow>
          <DesktopCarousel
            images={props.images}
            viewportRef={viewportRef}
            selectedSlide={selectedSlide}
          />

          <TopColumn>
            <Heading1>{props.heading}</Heading1>
            <Text marginBottom={SpacingValue.large}>{props.paragraph}</Text>
          </TopColumn>
        </TopRow>

        <BottomRow>
          <MessageWrapper>
            <StyledInspirationalMessage>
              {props.images[selectedSlide].imageText}
            </StyledInspirationalMessage>
          </MessageWrapper>

          <BottomColumn>
            <StyledVideo src={videoSrc} />
          </BottomColumn>
        </BottomRow>
      </Grid>
    </Section>
  );
};

export default GoBoatSpiritDesktop;
