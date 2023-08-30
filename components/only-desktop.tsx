import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: unset;
  }
`;

const OnlyDesktop: React.FC = (props) => {
  return <Container>{props.children}</Container>;
};

export default OnlyDesktop;
