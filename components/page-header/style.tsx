import styled from 'styled-components';

import { Heading1, SmallText } from '../../sub-components/Text';

import Image from '../image/image';
import VideoPlayer from '../../sub-components/video-player';

export const MediaWrapper = styled.div`
  position: relative;
  height: 73vw;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 40vw;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    height: 32vw;
  }

  img,
  video {
    object-fit: cover;
  }
`;

export const Heading = styled(Heading1)<{ haveMedia: boolean }>`
  margin-top: ${(props) => (props.haveMedia ? 16 : 60)}px;
  margin-bottom: 24px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: ${(props) => (props.haveMedia ? 32 : 160)}px;
    margin-bottom: 32px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderImage = styled(Image)`
  height: 100%;
  position: relative;
`;

export const HeaderVideo = styled(VideoPlayer)`
  width: 100%;
  height: 100%;
`;

export const Caption = styled(SmallText)`
  margin: 8px 0 0;
  align-self: flex-end;
  font-style: italic;
`;
