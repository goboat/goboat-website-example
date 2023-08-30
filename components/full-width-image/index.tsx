import NextImage, { ImageLoader, ImageProps as NextImageProps } from 'next/image';
import React from 'react';
import { ContentBlock } from '../dynamic-module-generator';
import { ContentImage, ImageLayout } from '../image/image';
import { getCleanMediaUrl } from '../../lib/utils';
import { GridOptionValue, RenderedSectionProps } from '../section/types';
import { SpacingValue } from '../../styles/Theme';
import Section from '../section/section';
import Column from '../section/column';
import { ImageAttribution } from '../image/style';
import styled from 'styled-components';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { ImageCaption } from '../image/style';

export interface FullWidthImageBlock extends Omit<ContentBlock, 'blocks' | 'blockName'> {
  blockName: 'goboat/full-width-image';
  includeAttribution: boolean;
  textGridColumn: number;
  imageText?: string;
  image?: ContentImage;
}

export interface FullWithImageProps extends FullWidthImageBlock {}

const ImageWrapper = styled.figure`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const FullWidthImage = (props: FullWidthImageBlock) => {
  const localize = useLocalize();

  const src = getCleanMediaUrl(props.image?.url);

  if (!src || !props.image?.url) {
    return null;
  }

  const imageProps: NextImageProps = {
    src: src,
    alt: String(props.image.alt),
    layout: ImageLayout.responsive,
    width: props.image.width,
    height: props.image.height,
  };

  const sectionProps: RenderedSectionProps = {
    template: [{ width: props.textGridColumn }, { width: 12 - props.textGridColumn }],
    marginTop: SpacingValue.xsmall,
    marginBottom: SpacingValue.large,
    paddingTop: SpacingValue.none,
    paddingBottom: SpacingValue.none,
    gridOptions: {
      left: GridOptionValue.normal,
      right: GridOptionValue.normal,
    },
  };

  return (
    <>
      <ImageWrapper>
        <NextImage {...imageProps} />
      </ImageWrapper>
      {(props.includeAttribution || props.imageText) && (
        <Section {...sectionProps}>
          <Column>
            {props.imageText ? (
              <ImageCaption alignment="right">{props.imageText}</ImageCaption>
            ) : null}
            {props.includeAttribution ? (
              <ImageAttribution alignment="right">
                {localize(Localization.photoAttribution)}: {props.image.attribution}
              </ImageAttribution>
            ) : null}
          </Column>
          <Column />
        </Section>
      )}
    </>
  );
};

export default FullWidthImage;
