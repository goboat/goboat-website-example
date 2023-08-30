import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <OuterDiv>
      <InnerDiv />
      <InnerDiv />
    </OuterDiv>
  );
};

const OuterDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const InnerDiv = styled.div`
  position: absolute;
  border: 4px solid ${(props) => props.theme.colors.dark};
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  &:nth-of-type(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

export default Spinner;
