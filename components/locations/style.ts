import styled from 'styled-components';

import Image from '../image/image';

export const LocationsButtonGroup = styled.div`
  display: inline-grid;
  grid-gap: 32px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.desktopLarge}px) {
    grid-template-rows: repeat(3, 1fr);
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
`;

export const LocationsImageWrapper = styled.div`
  position: relative;
  height: 39.1vw;
`;

export const LocationsImage = styled(Image)<{ selected: boolean }>`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.selected ? 1 : 0)};
  pointer-events: ${(props) => (props.selected ? 'auto' : 'none')};
  z-index: ${(props) => (props.selected ? 2 : 1)};
  transition: all 0.7s;
`;

export const NoImage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorButtonBackgroundSecondary};
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 1.5rem;
  padding: 16px;

  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    position: absolute;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const LocationCard = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 4px;
  border: 1px solid #333233;
  border-radius: 22px;
  height: 152px;
  margin-bottom: 16px;
`;

export const LocationCardImage = styled(Image)`
  position: relative;
  overflow: hidden;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  height: 100%;
`;

export const LocationCardGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 4px;
`;
