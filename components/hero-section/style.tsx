import styled from 'styled-components';
import { fontHeadingSemiBold } from '../../styles/fonts';

import VideoPlayer from '../../sub-components/video-player';

interface HeadingProps {
  alignment: string;
  colour: string;
}

export const Section = styled.section`
  position: relative;
  margin-bottom: 30px;
  height: calc(100vh - 204px);
  img,
  video {
    object-fit: cover;
  }
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: calc(100vh - 104px);
  }
`;

export const Heading = styled.h1<HeadingProps>`
  ${fontHeadingSemiBold}

  margin: 0;
  color: ${(props) =>
    props.colour === 'light'
      ? props.theme.colorHeroHeadlineLight
      : props.theme.colorHeroHeadlineDark};
  position: absolute;
  ${(props) =>
    props.alignment === 'bottomLeft' &&
    `bottom: 20px;
     left: 20px;
  `};
  ${(props) =>
    props.alignment === 'bottomRight' &&
    `bottom: 20px;
     right: 20px;
  `};
  ${(props) =>
    props.alignment === 'topLeft' &&
    `top: 20px;
     left: 20px;
  `};
  ${(props) =>
    props.alignment === 'topRight' &&
    `top: 20px;
     right: 20px;
  `};

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: 2rem;
    padding: 80px;
  }
`;

export const Video = styled(VideoPlayer)`
  width: 100%;
  height: 100%;
`;
