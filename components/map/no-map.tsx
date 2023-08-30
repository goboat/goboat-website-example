import React from 'react';

import { Heading3 } from '../../sub-components/Text';
import { NoMapContainer } from './style';

const NoMap: React.FC = ({ children }) => {
  return (
    <NoMapContainer>
      <Heading3>{children}</Heading3>
    </NoMapContainer>
  );
};

export default NoMap;
