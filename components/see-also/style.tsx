import styled from 'styled-components';

import ArrowIcon from '../icons/arrow';
import Image from '../image/image';

export const SeeAlsoContainer = styled.a`
  width: 100%;
  max-width: 708px;
  background: ${(props) => props.theme.colors.seeAlsoBackground};
  padding: 8px;
  display: flex;
  margin: 32px 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: 16px;
    margin: 46px 0;
  }
`;

export const SeeAlsoNoImage = styled.div`
  width: 168px;
  height: 94px;
  background: #d9d9d9;
  margin-right: 8px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-right: 24px;
    width: 227px;
    height: 121px;
  }
`;

export const StyledArrow = styled(ArrowIcon)`
  align-self: center;
  margin-left: auto;
  width: 11px;
  height: 20px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 14px;
    height: 26px;
    opacity: 0;
    transition: all 0.2s;

    ${SeeAlsoContainer}:hover && {
      opacity: 1;
    }
  }
`;

export const StyledImage = styled(Image)`
  margin: 0 8px 0 0;
  width: 168px;
  height: 94px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-right: 24px;
    width: 227px;
    height: 121px;
  }
`;
