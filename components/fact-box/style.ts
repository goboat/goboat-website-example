import styled from 'styled-components';
import { hexToRgb } from '../../lib/utils';

export const StyledFactBox = styled.div`
  background-color: ${(props) => props.theme.colors.factBoxBackground};
  position: relative;
`;

export const StyledFactBoxControlsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 87px;
  cursor: pointer;
  padding-right: 1.33rem;
`;

export const StyledFactBoxGradientOverlay = styled.div<StyledFactBoxGradientOverlayProps>`
  height: 120px;
  background: ${(props) =>
    `linear-gradient(transparent, ${hexToRgb(props.theme.colors.factBoxBackground, {
      opacity: 70,
    })}, ${props.theme.colors.factBoxBackground})`};
  position: absolute;
  bottom: 87px;
  width: 100%;
  ${(props) => (props.open ? 'opacity: 0;' : 'opacity: 1;')}
  transition: opacity .2s;
`;
type StyledFactBoxGradientOverlayProps = {
  open: boolean;
};

export const StyledFactBoxContent = styled.div`
  overflow: hidden;
  padding: 3rem 4rem 2rem 4rem;

  @media screen and (max-width: 767px) {
    padding: 2rem 1rem 0 1rem;
  }
`;

export const StyledExpandableFactBoxContent = styled.div<StyledFactBoxContentProps>`
  overflow: hidden;
  padding: 2rem 2.67rem 0 2.67rem;
  max-height: 10000px;
  ${(props) => (!props.open ? 'max-height: 480px;' : '')}

  @media screen and (max-width: 767px) {
    padding: 2rem 1rem 0 1rem;
  }
`;
type StyledFactBoxContentProps = {
  open: boolean;
  expandable: boolean;
};

export const StyledOpenCloseText = styled.div`
  font-size: 1rem;
  margin-right: 0.75rem;
  color: ${(p) => p.theme.colors.factBoxText};
  text-transform: lowercase;

  @media screen and (max-width: 767px) {
    font-size: 21px;
  }
`;
