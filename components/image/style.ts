import styled, { css } from 'styled-components';

import { VisibilityOptions } from '../../lib/types';
import { ImageProps } from './image';
import { SmallText } from '../../sub-components/Text';

const leftFloatCss = css`
  float: left;
  width: calc(50% - ${(props) => props.theme.grid.gap}px / 2);
  margin-left: calc(-25% - ${(props) => props.theme.grid.gap}px * 0.25);
  margin-right: ${(props) => props.theme.grid.gap}px;
  margin-bottom: 0;
`;

const rightFloatCss = css`
  float: right;
  width: calc(50% - ${(props) => props.theme.grid.gap}px / 2);
  margin-right: calc(-25% - ${(props) => props.theme.grid.gap}px * 0.25);
  margin-left: ${(props) => props.theme.grid.gap}px;
`;

interface ImageWrapperProps {
  float?: ImageProps['float'];
  visibility?: VisibilityOptions;
}

export const ImageWrapper = styled.div<ImageWrapperProps>`
  width: 100%;

  ${(props) => (props.visibility?.mobile === false ? 'display: none;' : null)}

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: ${(props) => (props.visibility?.desktop === false ? 'none' : 'block')};

    ${(props) =>
      props.float === 'left'
        ? leftFloatCss
        : props.float === 'right'
        ? rightFloatCss
        : null}
  }
`;

interface ImageCaptionProps {
  alignment: 'left' | 'right' | 'auto';
}

export const ImageCaption = styled(SmallText)<ImageCaptionProps>`
  text-align: right;
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    text-align: ${(props) => props.alignment};
  }
  margin: 0;
`;

export const ImageAttribution = styled(ImageCaption)`
  font-style: italic;
`;
