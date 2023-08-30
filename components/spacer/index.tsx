import React from 'react';
import styled from 'styled-components';

interface SpacerProps {
  width?: string;
  height?: string;
}

const StyledSpacer = styled.div<SpacerProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Spacer = (props: SpacerProps) => {
  return <StyledSpacer {...props} />;
};

export default Spacer;
