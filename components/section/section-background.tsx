import styled, { useTheme } from 'styled-components';
import { ColorBackgroundProps, GridOptionValue, SectionBackgroundProps } from './types';
import { getDesktopLayout, getExtendedGridLayout } from './helpers';
import Image, { ImageLayout } from '../image/image';
import { getBackgroundStyle } from './style';

const ColorBackground = styled.div<ColorBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${(props) => props.backgroundStyle}

  grid-column: ${(props) => (props.gridOptions.left === GridOptionValue.full ? 1 : 3)} /
    ${(props) => (props.gridOptions.right === GridOptionValue.full ? -1 : -3)};

  /* Desktop grid up to the point where the extended grid becomes active */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    ${getDesktopLayout}
  }
  /* Desktop layout w/ extended grid */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    ${getExtendedGridLayout}
  }
`;

const ImageBackground = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  grid-column: ${(props) => (props.gridOptions.left === GridOptionValue.full ? 1 : 3)} /
    ${(props) => (props.gridOptions.right === GridOptionValue.full ? -1 : -3)};

  /* Desktop grid up to the point where the extended grid becomes active */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    ${getDesktopLayout}
  }
  /* Desktop layout w/ extended grid */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.extendedGrid}px) {
    ${getExtendedGridLayout}
  }
`;

const SectionBackground = (props: SectionBackgroundProps) => {
  const { backgroundType, backgroundValue, gridOptions, preloadImage } = props;
  const theme = useTheme();

  if (backgroundType === 'color' && typeof backgroundValue === 'string') {
    return (
      <ColorBackground
        backgroundStyle={getBackgroundStyle(backgroundType, backgroundValue, theme)}
        gridOptions={gridOptions}
        theme={theme}
      />
    );
  }

  if (backgroundType === 'image' && typeof backgroundValue === 'object') {
    return (
      <ImageBackground
        image={{ url: backgroundValue.url }}
        gridOptions={gridOptions}
        theme={theme}
        layout={ImageLayout.fill}
        objectFit="cover"
        priority={preloadImage}
      />
    );
  }

  // Don't render a transparent background
  return null;
};

export default SectionBackground;
