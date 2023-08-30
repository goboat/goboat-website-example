import Image from 'next/image';
import styled from 'styled-components';

export const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-left: -25px;
  }
`;

export const EmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${(props) => props.theme.grid.mobile.outerMargin}px 22px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0 ${(props) => props.theme.grid.outerMargin}px 64px;
  }

  @media (min-width: ${(props) =>
      props.theme.grid.innerWidth +
      props.theme.grid.extendedColumnMaxWidth * 2 +
      props.theme.grid.outerMargin * 2}px) {
    align-self: center;
    width: ${(props) =>
      props.theme.grid.innerWidth + props.theme.grid.extendedColumnMaxWidth * 2}px;
  }
`;

export const ArrowIcon = styled.div`
  cursor: pointer;
  margin: 0;
  margin-left: 20px;
  width: 26px;
  height: 26px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-left: 40px;
    width: 2.916vw;
    height: 2.916vw;
    min-width: 26px;
    min-height: 26px;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
`;
