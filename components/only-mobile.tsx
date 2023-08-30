import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: none;
  }
`;

const OnlyMobile: React.FC = (props) => {
  return <Container>{props.children}</Container>;
};

export default OnlyMobile;
